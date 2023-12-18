import { File } from "@prisma/client";
import { cache } from "react";
import { getSignedFileUrl } from "@/lib/client/s3";
import { OBJECT_PUBLIC_BASE_URL, PUBLIC_BUCKET_NAME } from "@/lib/constant";
import { validate } from "@/lib/validation";

import { Extension, extensions } from "@/types/file";

type Result = {
  file: string;
  extension: Extension;
};

export const getSignedFile = cache(
  async (id: string, extension: Extension): Promise<Result> => {
    const filename = `${id}.${extension}`;
    const url = await getSignedFileUrl(filename, PUBLIC_BUCKET_NAME);

    const response = await fetch(url, {
      method: "GET",
      next: {
        tags: ["files"],
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get file");
    }

    const file = await response.text();

    return {
      file,
      extension,
    };
  }
);

export const getNotSignedFile = cache(
  async (id: string, extension: Extension): Promise<Result> => {
    const filename = `${id}.${extension}`;
    const url = `${OBJECT_PUBLIC_BASE_URL}/${filename}`;

    const response = await fetch(url, {
      method: "GET",
      next: {
        tags: ["files"],
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get file");
    }

    const file = await response.text();

    return {
      file,
      extension,
    };
  }
);

export const getFiles = (codes: File[]): Promise<Result[]> => {
  const extensionList = codes.map((code) => {
    validate(code.extension, extensions);

    return {
      fileId: code.objectId,
      extension: code.extension,
    };
  });

  return Promise.all(
    extensionList.map(async ({ fileId, extension }) => {
      return getNotSignedFile(fileId, extension);
    })
  );
};
