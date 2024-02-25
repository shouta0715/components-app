import { CodeBundlerError } from "@/scripts/ui-preview/errors";
import { MIMETYPE } from "@/scripts/ui-preview/types";
import { Extension } from "@/types/file";

const badCombinationExtensions: [Extension, Extension][] = [
  ["js", "ts"],
  ["js", "tsx"],
  ["jsx", "ts"],
  ["jsx", "tsx"],
];

export const isBadCombination = (extensions: Extension[]): boolean => {
  if (extensions.filter((ext) => ext === "html").length > 1) return true;

  const uniqueExtensions = [...new Set(extensions)];

  return badCombinationExtensions.some((badCombination) => {
    const [firstExtension, secondExtension] = badCombination;

    return (
      uniqueExtensions.includes(firstExtension) &&
      uniqueExtensions.includes(secondExtension)
    );
  });
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
