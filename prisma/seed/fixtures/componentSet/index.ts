/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import { ComponentSet, Prisma, User } from "@prisma/client";
import { getSignedPostUrl } from "@/lib/client/s3";
import { randomString } from "@/utils/random";

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

async function generateSeedComponentSets(
  users: User[]
): Promise<Prisma.ComponentSetCreateManyInput[]> {
  const image = await uploadFiles();

  const created = users.map((user) => {
    return Array.from({ length: 2 }).map((_, i) => {
      return {
        name: `${user.name} Component Set ${i}`,
        creatorId: user.id,
        draft: i % 2 === 0,
        document: randomString(),
        previewImageUrl: image.id,
      };
    });
  });

  return created.flat();
}

export async function seedComponentSets(
  tx: Prisma.TransactionClient,
  users: User[]
): Promise<ComponentSet[]> {
  const result = await tx.componentSet.findFirst();

  if (result) {
    console.log("Components already seeded");

    return tx.componentSet.findMany();
  }

  const values = await generateSeedComponentSets(users);

  await tx.componentSet.createMany({ data: values });

  return tx.componentSet.findMany();
}
