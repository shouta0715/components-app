import { CompiledFile, TransformedFile } from "@/scripts/ui-preview/types";
import { getExtensionToMimeType } from "@/scripts/ui-preview/utils";
import { FileObject } from "@/services/files/get";

export const fxHTMLFile: FileObject = {
  extension: "html",
  file: "<div></div>",
  componentId: "1",
  id: "1",
};

export const fxHTMLFileResult: TransformedFile = {
  content: "<div></div>",
  extension: "html",
  mimeType: "text/html",
  originallyExtension: undefined,
  id: "1",
};

export const fxTSXFile: FileObject = {
  extension: "tsx",
  file: "export const Example = () => {} const a = 1; console.log(a);",
  componentId: "1",
  id: "1",
};

export const fxMockNameTSXFile: CompiledFile = {
  extension: "tsx",
  file: "export const Mock = () => {} const a = 1; console.log(a);",
  componentId: "1",
  id: "1",
};

export const fxJSXFile: FileObject = {
  extension: "jsx",
  file: "export function Example(){}const a = 1; console.log(a);",
  componentId: "1",
  id: "1",
};

export const fxTSFile: FileObject = {
  extension: "ts",
  file: "const a = 1; console.log(a);",
  componentId: "1",
  id: "1",
};

export const fxJSFile: FileObject = {
  extension: "js",
  file: "const a = 1; console.log(a);",
  componentId: "1",
  id: "1",
};

export const fxCSSFile: FileObject = {
  extension: "css",
  file: "body { color: red; }",
  componentId: "1",
  id: "1",
};

export const fxGetFilesResult = (arg: CompiledFile): TransformedFile => {
  return {
    content: arg.file,
    extension: arg.extension,
    mimeType: getExtensionToMimeType(arg.extension),
    originallyExtension: arg.originallyExtension,
    id: arg.id,
  };
};

export const fxFunctionName = "Example";
