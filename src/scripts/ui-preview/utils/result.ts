import { RENDER_ACTION } from "@/scripts/ui-preview/constant";
import {
  CompiledFile,
  ExportStyle,
  SuccessTransformedData,
  TransformedFile,
  TransformedResult,
} from "@/scripts/ui-preview/types";
import { getExtensionToMimeType } from "@/scripts/ui-preview/utils";

export const htmlToResult = (
  files: CompiledFile[],
  mainFileId: string
): TransformedResult => {
  const resultFiles: TransformedFile[] = files.map((file) => {
    return {
      content: file.file,
      mimeType: getExtensionToMimeType(file.extension),
      extension: file.extension,
      originallyExtension: file.originallyExtension,
      id: file.id,
    };
  });

  const data: SuccessTransformedData = {
    files: resultFiles,
    componentName: null,
    action: RENDER_ACTION,
    exportStyle: null,
    mainFileId,
  };

  return {
    data,
  };
};

export const reactToResult = (
  componentName: string,
  files: CompiledFile[],
  exportStyle: ExportStyle,
  mainFileId: string
): TransformedResult => {
  const resultFiles: TransformedFile[] = files.map((file) => {
    return {
      content: file.file,
      mimeType: getExtensionToMimeType(file.extension),
      extension: file.extension,
      originallyExtension: file.originallyExtension,
      id: file.id,
    };
  });

  const data: SuccessTransformedData = {
    files: resultFiles,
    componentName,
    action: RENDER_ACTION,
    exportStyle,
    mainFileId,
  };

  return {
    data,
  };
};
