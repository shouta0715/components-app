import { CodeBundlerError } from "@/scripts/ui-preview/errors";
import { MIMETYPE } from "@/scripts/ui-preview/types";
import { FileObject } from "@/services/files/get";
import { Extension } from "@/types/file";

const badCombinationExtensions: [Extension, Extension] = ["js", "ts"] || [
    "jsx",
    "tsx",
  ] || ["js", "tsx"] || ["jsx", "ts"];

const isDuplicationExtensions = (extensions: Extension[]): boolean => {
  if (extensions.length === 1) return false;

  const uniqueExtensions = [...new Set(extensions)];

  return extensions.length !== uniqueExtensions.length;
};

export const isBadCombination = (files: FileObject[]): boolean => {
  const extensions = files.map((file) => file.extension);

  if (isDuplicationExtensions(extensions)) return true;

  return badCombinationExtensions.every((extension) =>
    extensions.includes(extension)
  );
};

export const getExtensionToMimeType = (extension: Extension): MIMETYPE => {
  switch (extension) {
    case "html":
      return "text/html";
    case "css":
      return "text/css";
    case "js":
      return "text/javascript";

    default:
      throw new CodeBundlerError();
  }
};
