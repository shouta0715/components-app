import { compile } from "@/scripts/ui-preview/compilers";
import { CodeBundlerError, CompilerError } from "@/scripts/ui-preview/errors";
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
  if (files.length === 1) return htmlToResult([htmlFile]);

  const removedPreview = files.filter(
    ({ extension }) =>
      extension !== "tsx" && extension !== "jsx" && extension !== "html"
  );

  if (removedPreview.length < 1) return htmlToResult([htmlFile]);

  const compileFiles = await Promise.all(
    removedPreview.map(({ file, extension }) => compile(file, extension))
  );

  const compiledFiles: CompiledFile[] = compileFiles.map(
    ({ error, result }, index) => {
      if (error) throw new CompilerError();

      const { extension, componentId } = removedPreview[index];

      if (extension === "ts" || extension === "js") {
        return {
          file: replaceImports(result),
          extension: "js",
          componentId,
          originallyExtension: extension,
        };
      }

      return {
        file: result,
        extension,
        componentId,
        originallyExtension: extension,
      };
    }
  );

  return htmlToResult([htmlFile, ...compiledFiles]);
}

export async function transformWithoutHTML(
  files: FileObject[]
): Promise<TransformedResult> {
  const mainFile = files.find(
    (file) => file.extension === "tsx" || file.extension === "jsx"
  );

  if (!mainFile) throw new CodeBundlerError();

  const { result: componentName, exportStyle } = getExportComponentName(
    mainFile.file
  );

  const compileFiles = await Promise.all(
    files.map(({ file, extension }) => compile(file, extension))
  );

  const compiledFiles: CompiledFile[] = compileFiles.map(
    ({ error, result }, index) => {
      if (error) throw new CompilerError();

      const { extension, componentId } = files[index];

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
        };
      }

      return {
        file: result,
        extension,
        componentId,
        originallyExtension: extension,
      };
    }
  );

  return reactToResult(componentName, compiledFiles, exportStyle);
}
