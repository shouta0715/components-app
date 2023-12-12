/* eslint-disable no-console */
import fs from "fs";
import path from "path";
import { createId } from "@paralleldrive/cuid2";
import { codes } from "@/db/schema";
import { Tx } from "@/db/seed/client";

import { getSignedPostUrl } from "@/lib/client/s3";
import { PRIVATE_BUCKET_NAME, PUBLIC_BUCKET_NAME } from "@/lib/constant";
import { Code, Component, InsertCode } from "@/types/drizzle";
import { ExtensionType } from "@/types/file";
import { getContentType } from "@/utils";

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

  const { url, fields, id } = await getSignedPostUrl(
    contentType,
    type,
    PUBLIC_BUCKET_NAME
  );

  const { url: url2, fields: fields2 } = await getSignedPostUrl(
    contentType,
    type,
    PRIVATE_BUCKET_NAME
  );

  const formData = new FormData();
  const formData2 = new FormData();

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  Object.entries(fields2).forEach(([key, value]) => {
    formData2.append(key, value);
  });

  const file = loadFiles(type);

  formData.append("file", new Blob([file], { type: contentType }));
  formData2.append("file", new Blob([file], { type: contentType }));

  const [res, res2] = await Promise.all([
    fetch(url, {
      method: "POST",
      body: formData,
    }),
    fetch(url2, {
      method: "POST",
      body: formData2,
    }),
  ]);

  if (!res.ok || !res2.ok) {
    console.log(res.ok, res2.ok);
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
    uploadFiles("html"),
    uploadFiles("tsx"),
    uploadFiles("jsx"),
    uploadFiles("css"),
    uploadFiles("js"),
    uploadFiles("ts"),
  ]);

  const created = components.map((component) => {
    return Array.from({ length: 2 }).map((_, i) => {
      // html,jsx,tsxからどれかを選ぶ
      const uiIndex = Math.floor(Math.random() * 3) + 1;
      const otherIndex = Math.floor(Math.random() * 3) + 3;

      return {
        id: createId(),
        componentId: component.id,
        fileId: files[i === 0 ? uiIndex : otherIndex].id,
        type: files[i === 0 ? uiIndex : otherIndex].type,
      };
    });
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
