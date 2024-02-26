import { compile } from "@/scripts/ui-preview/compilers";
import {
  CodeBundlerError,
  CompilerError,
  PackageError,
} from "@/scripts/ui-preview/errors";
import {
  getExportComponentName,
  replaceImports,
} from "@/scripts/ui-preview/packages";
import { CompiledFile, TransformedResult } from "@/scripts/ui-preview/types";
import { htmlToResult, reactToResult } from "@/scripts/ui-preview/utils/result";

import { FileObject } from "@/services/files/get";

export async function transformWithHTML(
  files: FileObject[],
  htmlFile: FileObject
): Promise<TransformedResult> {
  const mainFileId = htmlFile.id;
  if (files.length === 1) return htmlToResult([htmlFile], mainFileId);

  const removedPreview = files.filter(
    ({ extension }) =>
      extension !== "tsx" && extension !== "jsx" && extension !== "html"
  );

  if (removedPreview.length < 1) return htmlToResult([htmlFile], mainFileId);

  const compileFiles = await Promise.all(
    removedPreview.map(({ file, extension }) => compile(file, extension))
  );

  const compiledFiles: CompiledFile[] = compileFiles.map(
    ({ error, result }, index) => {
      if (error) throw new CompilerError();

      const { extension, componentId, id } = removedPreview[index];

      if (extension === "ts" || extension === "js") {
        return {
          file: replaceImports(result),
          extension: "js",
          componentId,
          originallyExtension: extension,
          id,
        };
      }

      return {
        file: result,
        extension,
        componentId,
        originallyExtension: extension,
        id,
      };
    }
  );

  return htmlToResult([htmlFile, ...compiledFiles], mainFileId);
}

export async function transformWithoutHTML(
  files: FileObject[],
  functionName?: string
): Promise<TransformedResult> {
  if (!functionName) throw new PackageError();

  const targetFiles = files.filter(({ extension }) => extension !== "html");

  const mainFiles: {
    file: string;
    id: string;
  }[] = [];

  for (const { file, extension, id } of targetFiles) {
    if (extension !== "tsx" && extension !== "jsx" && extension !== "js")
      continue;
    mainFiles.push({ file, id });
  }

  if (!mainFiles.length) throw new CodeBundlerError();

  const { exportStyle, mainFileId } = getExportComponentName(
    mainFiles,
    functionName
  );

  const compileFiles = await Promise.all(
    targetFiles.map(({ file, extension }) => compile(file, extension))
  );

  const compiledFiles: CompiledFile[] = compileFiles.map(
    ({ error, result }, index) => {
      if (error) throw new CompilerError();

      const { extension, componentId, id } = targetFiles[index];

      if (
        extension === "ts" ||
        extension === "tsx" ||
        extension === "jsx" ||
        extension === "js"
      ) {
        return {
          file: replaceImports(result),
          extension: "js",
          componentId,
          originallyExtension: extension,
          id,
        };
      }

      return {
        file: result,
        extension,
        componentId,
        originallyExtension: extension,
        id,
      };
    }
  );

  return reactToResult(functionName, compiledFiles, exportStyle, mainFileId);
}
