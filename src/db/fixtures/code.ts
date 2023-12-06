/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import { createId } from "@paralleldrive/cuid2";
import { codes } from "@/db/schema";
import { Tx } from "@/db/seed/client";

import { getSignedPostUrl } from "@/lib/client/s3";
import { Code, Component, InsertCode } from "@/types/drizzle";
import { ExtensionType } from "@/types/file";
import { randomNum } from "@/utils/random";

const getContentType = (type: ExtensionType) => {
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

function loadFiles(type: ExtensionType): string {
  const baseFolder = `${process.cwd()}/src/db/fixtures/assets`;

  const filePath = path.join(baseFolder, `index.${type}`);

  return fs.readFileSync(filePath, "utf8");
}

async function uploadFiles(type: ExtensionType): Promise<{
  type: ExtensionType;
  id: string;
}> {
  const contentType = getContentType(type);

  const { url, fields, id } = await getSignedPostUrl(contentType, type);

  const formData = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const file = loadFiles(type);

  formData.append("file", new Blob([file], { type: contentType }));

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to upload file");
  }

  return {
    type,
    id,
  };
}

async function generateSeedCode(
  components: Component[]
): Promise<InsertCode[]> {
  const files = await Promise.all([
    uploadFiles("tsx"),
    uploadFiles("html"),
    uploadFiles("css"),
    uploadFiles("js"),
    uploadFiles("ts"),
  ]);

  const created = components.map((component) => {
    return {
      id: createId(),
      componentId: component.id,
      fileId: files[randomNum(files.length - 1)].id,
      type: files[randomNum(files.length - 1)].type,
    };
  });

  return created.flat();
}

export async function seedCodes(
  tx: Tx,
  components: Component[]
): Promise<Code[]> {
  const result = await tx.query.codes.findFirst();

  if (result) {
    console.log("Code already seeded");

    return tx.query.codes.findMany();
  }

  const values = await generateSeedCode(components);

  await tx.insert(codes).values(values);

  return tx.query.codes.findMany();
}
