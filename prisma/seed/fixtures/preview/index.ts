/* eslint-disable no-console */

import { Category, Component, Prisma } from "@prisma/client";
import { uploadImage } from "../lib/uploadimage";

const updatedImages: {
  [key: string]: string;
} = {};

async function uploadPreviewImage(name: string): Promise<{ id: string }> {
  const { id } = await uploadImage(name);

  updatedImages[name] = id;

  return { id };
}

async function generateSeedPreviewImages(
  component: Component[],
  categories: Category[]
): Promise<Prisma.ComponentPreviewImageCreateManyInput[]> {
  const categoryNames = categories.map((c) => c.name);

  //
  const third = Math.ceil(categoryNames.length / 3);
  const firstThird = categoryNames.slice(0, third);
  const secondThird = categoryNames.slice(third, 2 * third);
  const lastThird = categoryNames.slice(2 * third);

  console.debug("uploading preview images for first third");
  await Promise.all(
    firstThird.map(async (name) => {
      await uploadPreviewImage(name);
    })
  );

  console.debug("uploading preview images for second third");

  await Promise.all(
    secondThird.map(async (name) => {
      await uploadPreviewImage(name);
    })
  );

  console.debug("uploading preview images for last third");

  await Promise.all(
    lastThird.map(async (name) => {
      await uploadPreviewImage(name);
    })
  );

  const created = await Promise.all(
    component.map(async (target) => {
      const category = categories.find((c) => c.id === target.categoryId);

      if (!category) {
        throw new Error("Category not found");
      }
      const imageId = updatedImages?.[category.name];

      if (!imageId) {
        throw new Error("Image not found");
      }

      return Array.from({ length: 2 }).map((_, i) => {
        return {
          componentId: target.id,
          objectId: imageId,
          responsive:
            i % 2 === 0 ? "mobile" : ("desktop" as "mobile" | "desktop"),
        };
      });
    })
  );

  return created.flat();
}

export async function seedPreviewImages(
  tx: Prisma.TransactionClient,
  components: Component[],
  categories: Category[]
): Promise<void> {
  const result = await tx.componentPreviewImage.findFirst();

  if (result) {
    console.log("Preview images already seeded");

    return;
  }

  const values = await generateSeedPreviewImages(components, categories);

  await tx.componentPreviewImage.createMany({ data: values });
}
