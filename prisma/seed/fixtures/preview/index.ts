/* eslint-disable no-console */

import { Component, Prisma } from "@prisma/client";
import { uploadImage } from "../lib/uploadimage";

async function generateSeedPreviewImages(
  component: Component[]
): Promise<Prisma.ComponentPreviewImageCreateManyInput[]> {
  const image = await uploadImage();

  const created = component.map((target) => {
    return Array.from({ length: 2 }).map((_, i) => {
      return {
        componentId: target.id,
        objectId: image.id,
        responsive:
          i % 2 === 0 ? "mobile" : ("desktop" as "mobile" | "desktop"),
      };
    });
  });

  return created.flat();
}

export async function seedPreviewImages(
  tx: Prisma.TransactionClient,
  components: Component[]
): Promise<void> {
  const result = await tx.componentPreviewImage.findFirst();

  if (result) {
    console.log("Preview images already seeded");

    return;
  }

  const values = await generateSeedPreviewImages(components);

  await tx.componentPreviewImage.createMany({ data: values });
}
