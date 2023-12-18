/* eslint-disable no-console */
import fs from "fs";
import path from "path";

import { $Enums, Component, File, Prisma } from "@prisma/client";

import { getSignedPostUrl } from "@/lib/client/s3";

import { randomNum } from "@/utils/random";

const getContentType = (type: $Enums.Extension) => {
  if (type === "tsx") {
    return "text/typescript-jsx";
  }

  if (type === "html") {
    return "text/html";
  }

  if (type === "css") {
    return "text/css";
  }

  if (type === "js") {
    return "text/javascript";
  }

  if (type === "jsx") {
    return "text/javascript-jsx";
  }

  return "text/typescript";
};

function loadFiles(type: $Enums.Extension): string {
  const baseFolder = `${process.cwd()}/prisma/seed/fixtures/assets/files`;

  const filePath = path.join(baseFolder, `index.${type}`);

  return fs.readFileSync(filePath, "utf8");
}

async function uploadFiles(type: $Enums.Extension): Promise<{
  type: $Enums.Extension;
  id: string;
}> {
  const contentType = getContentType(type);

  const { url, fields, id } = await getSignedPostUrl(
    contentType,
    type,
    "ui-trade-public"
  );

  const formData = new FormData();
  const formData2 = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const file = loadFiles(type);

  formData.append("file", new Blob([file], { type: contentType }));
  formData2.append("file", new Blob([file], { type: contentType }));

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    console.log(res.ok);
    throw new Error("Failed to upload file");
  }

  return {
    type,
    id,
  };
}

async function generateSeedFiles(
  components: Component[]
): Promise<Prisma.FileCreateManyInput[]> {
  const files = await Promise.all([
    uploadFiles("html"),
    uploadFiles("tsx"),
    uploadFiles("jsx"),
    uploadFiles("css"),
    uploadFiles("js"),
    uploadFiles("ts"),
  ]);

  const created: Prisma.FileCreateManyInput[] = components.map((component) => {
    return {
      objectId: files[randomNum(0, files.length - 1)].id,
      componentId: component.id,
      extension: files[randomNum(0, files.length - 1)].type,
    };
  });

  return created.flat();
}

export async function seedFiles(
  tx: Prisma.TransactionClient,
  components: Component[]
): Promise<File[]> {
  const result = await tx.file.findFirst();

  if (result) {
    console.log("Code already seeded");

    return tx.file.findMany();
  }

  const values = await generateSeedFiles(components);

  await tx.file.createMany({ data: values });

  return tx.file.findMany();
}
