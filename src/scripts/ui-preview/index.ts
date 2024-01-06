"server only";

import { BadCombinationExtensionsError } from "@/scripts/ui-preview/errors";

import { TransformedResult } from "@/scripts/ui-preview/types";
import { isBadCombination } from "@/scripts/ui-preview/utils";
import {
  transformWithHTML,
  transformWithoutHTML,
} from "@/scripts/ui-preview/utils/transform";
import { FileObject } from "@/services/files/get";

export async function transformCode(
  files: FileObject[]
): Promise<TransformedResult> {
  const extensions = files.map((file) => file.extension);
  if (isBadCombination(extensions)) throw new BadCombinationExtensionsError();

  const htmlFile = files.find((file) => file.extension === "html");

  if (htmlFile) return transformWithHTML(files, htmlFile);

  return transformWithoutHTML(files);
}
