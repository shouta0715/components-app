"server only";

import { compileTypescript } from "@/scripts/ui-preview/compilers/ts";
import { ERROR_MESSAGES } from "@/scripts/ui-preview/constant";
import {
  BadCombinationExtensionsError,
  CodeBundlerError,
  CompilerError,
} from "@/scripts/ui-preview/errors";
import {
  getExportComponentName,
  replaceImports,
} from "@/scripts/ui-preview/packages";
import { TransformedResult } from "@/scripts/ui-preview/types";
import {
  errorMessageToResult,
  htmlToResult,
  isBadCombination,
  reactToResult,
} from "@/scripts/ui-preview/utils";
import { FileObject } from "@/services/files/get";

async function transformWithHTML(
  files: FileObject[],
  htmlFile: FileObject
): Promise<TransformedResult> {
  // HTMLファイルのみの場合
  if (files.length === 1) return htmlToResult(htmlFile);

  const removedReactFiles = files.filter(
    (file) => file.extension !== "jsx" && file.extension !== "tsx"
  );

  if (removedReactFiles.length === 1) return htmlToResult(htmlFile);

  const tsFile = files.find((file) => file.extension === "ts");

  // ここを通る場合は、HTML + CSS OR HTML + JS OR HTML + JS + CSS
  if (!tsFile) return htmlToResult(htmlFile, removedReactFiles);

  const { error, result } = await compileTypescript(tsFile.file);

  if (error) throw new CompilerError();

  const cssFile = files.find((file) => file.extension === "css");

  const compiledTsFile: FileObject = {
    file: result,
    extension: "js",
    componentId: tsFile.componentId,
  };

  if (!cssFile) return htmlToResult(htmlFile, [compiledTsFile]);

  return htmlToResult(htmlFile, [compiledTsFile, cssFile]);
}

async function transformWithoutHTML(
  files: FileObject[]
): Promise<TransformedResult> {
  // ここに来た場合表示に使うファイルはJSXかTSXのみ。TSXとJSXの組み合わせは来ない。
  // TSXとJSまたはJSXとTSの組み合わせは来ない。

  const mainFile = files.find((file) => file.extension === "tsx" || "jsx");
  const cssFile = files.find((file) => file.extension === "css");
  const scriptFile = files.find((file) => file.extension === "ts" || "js");

  if (!mainFile) throw new CodeBundlerError();

  const componentName = getExportComponentName(mainFile.file);

  if (!scriptFile) {
    const { error, result } = await compileTypescript(mainFile.file);

    if (error) throw new CompilerError();

    const compiledMainFile: FileObject = {
      file: replaceImports(result),
      extension: "js",
      componentId: mainFile.componentId,
    };

    if (!cssFile) return reactToResult(compiledMainFile, componentName);

    return reactToResult(compiledMainFile, componentName, [cssFile]);
  }

  const [{ error: mainError, result: mainResult }, { error, result }] =
    await Promise.all([
      compileTypescript(mainFile.file),
      compileTypescript(scriptFile.file),
    ]);

  if (mainError || error) throw new CompilerError();

  const compiledMainFile: FileObject = {
    file: replaceImports(mainResult),
    extension: "js",
    componentId: mainFile.componentId,
  };

  const compiledScriptFile: FileObject = {
    file: replaceImports(result),
    extension: "js",
    componentId: scriptFile.componentId,
  };

  if (!cssFile) {
    return reactToResult(compiledMainFile, componentName, [compiledScriptFile]);
  }

  return reactToResult(compiledMainFile, componentName, [
    compiledScriptFile,
    cssFile,
  ]);
}

async function transformCode(files: FileObject[]): Promise<TransformedResult> {
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

export async function codeBundler(
  files: FileObject[]
): Promise<TransformedResult> {
  return transformCode(files);
}
