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
  // HTMLファイルのみの場合
  if (files.length === 1) return htmlToResult([htmlFile]);

  const removedPreview = files.filter(
    ({ extension }) =>
      extension !== "tsx" && extension !== "jsx" && extension !== "html"
  );

  if (removedPreview.length < 1) return htmlToResult([htmlFile]);

  const tsFile = files.find((file) => file.extension === "ts");

  // ここを通る場合は、HTML + CSS OR HTML + JS OR HTML + JS + CSS
  if (!tsFile) return htmlToResult([htmlFile, ...removedPreview]);

  const { error, result } = await compile(tsFile.file, tsFile.extension);

  if (error) throw new CompilerError();

  const cssFile = files.find((file) => file.extension === "css");

  const compiledTsFile: CompiledFile = {
    file: result,
    extension: "js",
    componentId: tsFile.componentId,
    originallyExtension: tsFile.extension,
  };

  if (!cssFile) return htmlToResult([htmlFile, compiledTsFile]);

  return htmlToResult([htmlFile, compiledTsFile, cssFile]);
}

export async function transformWithoutHTML(
  files: FileObject[]
): Promise<TransformedResult> {
  // ここに来た場合表示に使うファイルはJSXかTSXのみ。TSXとJSXの組み合わせは来ない。
  // TSXとJSまたはJSXとTSの組み合わせは来ない。

  const mainFile = files.find(
    (file) => file.extension === "tsx" || file.extension === "jsx"
  );
  const cssFile = files.find((file) => file.extension === "css");
  const scriptFile = files.find(
    (file) => file.extension === "ts" || file.extension === "js"
  );

  if (!mainFile) throw new CodeBundlerError();

  const componentName = getExportComponentName(mainFile.file);

  if (!scriptFile) {
    const { error, result } = await compile(mainFile.file, mainFile.extension);

    if (error) throw new CompilerError();

    const compiledMainFile: CompiledFile = {
      file: replaceImports(result),
      extension: "js",
      componentId: mainFile.componentId,
      originallyExtension: mainFile.extension,
    };

    if (!cssFile) return reactToResult(componentName, [compiledMainFile]);

    return reactToResult(componentName, [compiledMainFile, cssFile]);
  }

  const [{ error: mainError, result: mainResult }, { error, result }] =
    await Promise.all([
      compile(mainFile.file, mainFile.extension),
      compile(scriptFile.file, scriptFile.extension),
    ]);

  if (mainError || error) throw new CompilerError();

  const compiledMainFile: CompiledFile = {
    file: replaceImports(mainResult),
    extension: "js",
    componentId: mainFile.componentId,
    originallyExtension: mainFile.extension,
  };

  const compiledScriptFile: CompiledFile = {
    file: replaceImports(result),
    extension: "js",
    componentId: scriptFile.componentId,
    originallyExtension: scriptFile.extension,
  };

  if (!cssFile) {
    return reactToResult(componentName, [compiledMainFile, compiledScriptFile]);
  }

  return reactToResult(componentName, [
    compiledMainFile,
    compiledScriptFile,
    cssFile,
  ]);
}
