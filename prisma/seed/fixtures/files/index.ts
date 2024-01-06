/* eslint-disable prefer-destructuring */
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

  const created = components.map((component) => {
    let firstFileExtension: $Enums.Extension;
    let secondFileExtension: $Enums.Extension;

    return Array.from({ length: randomNum(1, 3) }).map((_, i) => {
      // １つ目はtsx or jsx or html
      // ２つ目以降はcss or js or ts

      if (i === 0) {
        const file = files[randomNum(0, 2)];

        firstFileExtension = file.type;

        return {
          objectId: file.id,
          extension: file.type,
          componentId: component.id,
        };
      }

      if (i === 1) {
        // jsxなら二個目はcss or js
        // tsxなら二個目はcss or ts
        // htmlなら二個目はcss or js or ts

        let file: { type: $Enums.Extension; id: string } | undefined;

        if (firstFileExtension === "jsx") {
          file = files[randomNum(3, 4)];

          secondFileExtension = file.type;
        }

        if (firstFileExtension === "tsx") {
          file = files[randomNum(3, 5)];

          secondFileExtension = file.type;
        }

        if (firstFileExtension === "html") {
          file = files[randomNum(3, 5)];

          secondFileExtension = file.type;
        }

        if (!file) throw new Error("Failed to generate seed files");

        return {
          objectId: file?.id,
          extension: file?.type,
          componentId: component.id,
        };
      }

      if (secondFileExtension === "css") {
        // 2個目がcssの場合1個目のファイルがjsxなら3個目はjs
        // 2個目がcssの場合1個目のファイルがtsxなら3個目はts
        // 2個目がcssの場合1個目のファイルがhtmlなら3個目はjs or ts

        let file: { type: $Enums.Extension; id: string } | undefined;

        if (firstFileExtension === "jsx") {
          file = files[4];
        }

        if (firstFileExtension === "tsx") {
          file = files[5];
        }

        if (firstFileExtension === "html") {
          file = files[randomNum(4, 5)];
        }

        if (!file) throw new Error("Failed to generate seed files");

        return {
          objectId: file?.id,
          extension: file?.type,
          componentId: component.id,
        };
      }

      // 3つめはCSS

      return {
        objectId: files[3].id,
        extension: files[3].type,
        componentId: component.id,
      };
    });
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
