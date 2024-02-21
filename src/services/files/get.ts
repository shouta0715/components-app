import { File } from "@prisma/client";

import { OBJECT_PUBLIC_BASE_URL } from "@/lib/constant";
import { validate } from "@/lib/validation";

import { Extension, extensions } from "@/types/file";

export type FileObject = {
  file: string;
  extension: Extension;
  componentId: string;
};

export const getNotSignedFile = async (
  id: string,
  extension: Extension,
  componentId: string
): Promise<FileObject> => {
  const filename = `${id}.${extension}`;
  const url = `${OBJECT_PUBLIC_BASE_URL}/${filename}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: ["files", `files/${id}`],
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get file");
  }

  const file = await response.text();

  return {
    file,
    extension,
    componentId,
  };
};

export const getFiles = (files: File[]): Promise<FileObject[]> => {
  const extensionList = files.map((file) => {
    validate(file.extension, extensions);

    return {
      fileId: file.objectId,
      extension: file.extension,
      componentId: file.componentId,
    };
  });

  return Promise.all(
    extensionList.map(async ({ fileId, extension, componentId }) => {
      return getNotSignedFile(fileId, extension, componentId);
    })
  );
};
