import { cache } from "react";
import { getSignedFileUrl } from "@/lib/client/s3";
import { OBJECT_PUBLIC_BASE_URL, PUBLIC_BUCKET_NAME } from "@/lib/constant";
import { validate } from "@/lib/validation";
import { Code } from "@/types/drizzle";
import { ExtensionType, extensions } from "@/types/file";

type Result = {
  file: string;
  extension: ExtensionType;
};

export const getSignedFile = cache(
  async (id: string, extension: ExtensionType): Promise<Result> => {
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
  async (id: string, extension: ExtensionType): Promise<Result> => {
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

export const getFiles = (codes: Code[]): Promise<Result[]> => {
  const extensionList = codes.map((code) => {
    validate(code.type, extensions);

    return {
      fileId: code.fileId,
      extension: code.type,
    };
  });

  return Promise.all(
    extensionList.map(async ({ fileId, extension }) => {
      return getNotSignedFile(fileId, extension);
    })
  );
};
