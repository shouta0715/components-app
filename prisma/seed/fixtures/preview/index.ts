/* eslint-disable no-console */

import fs from "fs";
import path from "path";
import { Component, Prisma } from "@prisma/client";
import { getSignedPostUrl } from "@/lib/client/s3";

function loadFiles(): string {
  const baseFolder = `${process.cwd()}/prisma/seed/fixtures/assets/images`;

  const filePath = path.join(baseFolder, `index.png`);

  return fs.readFileSync(filePath, "utf8");
}

async function uploadFiles(): Promise<{
  id: string;
}> {
  const { url, fields, id } = await getSignedPostUrl(
    "image/png",
    "png",
    "ui-trade-preview"
  );

  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const file = loadFiles();

  formData.append("file", new Blob([file], { type: "image/png" }));

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to upload file");
  }

  return {
    id,
  };
}

async function generateSeedPreviewImages(
  component: Component[]
): Promise<Prisma.ComponentPreviewImageCreateManyInput[]> {
  const image = await uploadFiles();

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
