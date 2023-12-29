"server only";

import { ERROR_MESSAGES } from "@/scripts/ui-preview/constant";
import {
  BadCombinationExtensionsError,
  CompilerError,
} from "@/scripts/ui-preview/errors";

import { TransformedResult } from "@/scripts/ui-preview/types";
import { isBadCombination } from "@/scripts/ui-preview/utils";
import { errorMessageToResult } from "@/scripts/ui-preview/utils/result";
import {
  transformWithHTML,
  transformWithoutHTML,
} from "@/scripts/ui-preview/utils/transform";
import { FileObject } from "@/services/files/get";

export async function transformCode(
  files: FileObject[]
): Promise<TransformedResult> {
  try {
    if (isBadCombination(files)) throw new BadCombinationExtensionsError();

    const htmlFile = files.find((file) => file.extension === "html");

    if (htmlFile) return await transformWithHTML(files, htmlFile);

    return await transformWithoutHTML(files);
  } catch (error) {
    if (error instanceof BadCombinationExtensionsError) {
      return errorMessageToResult(
        ERROR_MESSAGES.BAD_COMBINATION_EXTENSIONS_ERROR_MESSAGE
      );
    }

    if (error instanceof CompilerError) {
      return errorMessageToResult(ERROR_MESSAGES.COMPILE_ERROR_MESSAGE);
    }

    throw error;
  }
}
