import { BASE_HTML } from "@/scripts/ui-preview/base";
import { CodeBundlerError } from "@/scripts/ui-preview/errors";
import {
  ErrorMessage,
  MIMETYPE,
  TransformedFile,
  TransformedResult,
} from "@/scripts/ui-preview/types";
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

const getExtensionToMimeType = (extension: Extension): MIMETYPE => {
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

const mergeHTMLFiles = (files: FileObject[], htmlFile: FileObject): string => {
  const jsFiles = files.filter((file) => file.extension === "js");
  const cssFiles = files.filter((file) => file.extension === "css");

  const css = cssFiles.reduce((acc, curr) => {
    return `${acc}${curr.file}`;
  }, "");

  const scripts = jsFiles.reduce((acc, curr) => {
    return `${acc}${curr.file}`;
  }, "");

  let result = htmlFile.file.replace("</head>", `<style>${css}</style></head>`);

  result = result.replace(
    "</body>",
    `<script type="module">${scripts}</script></body>`
  );

  return result;
};

const mergeReactFiles = (file: string, componentName: string): string => {
  let result = BASE_HTML.replace("Component", componentName);
  result = result.replace("<<<REPLACE_SCRIPTS_HERE>>>", file);

  return result;
};

const skipToResult = (files: FileObject): TransformedResult => {
  const data: TransformedFile[] = [
    {
      content: files.file,
      mimeType: getExtensionToMimeType(files.extension),
      extension: files.extension,
    },
  ];

  return {
    error: false,
    data,
  };
};

export const htmlToResult = (
  htmlFile: FileObject,
  files?: FileObject[],
  mergeSkip = false
): TransformedResult => {
  if (mergeSkip || !files) return skipToResult(htmlFile);

  const content = mergeHTMLFiles(files, htmlFile);

  const data: TransformedFile[] = [
    {
      content,
      mimeType: getExtensionToMimeType("html"),
      extension: "html",
    },
  ];

  return {
    error: false,
    data,
  };
};

export const reactToResult = (
  mainFile: FileObject,
  componentName: string,
  files?: FileObject[]
): TransformedResult => {
  const mainFileContent = mergeReactFiles(mainFile.file, componentName);

  if (!files) return skipToResult({ ...mainFile, file: mainFileContent });

  const mainFileData: TransformedFile = {
    content: mainFileContent,
    mimeType: getExtensionToMimeType("html"),
    extension: "html",
  };

  const otherFilesData: TransformedFile[] = files.map((file) => {
    return {
      content: file.file,
      mimeType: getExtensionToMimeType(file.extension),
      extension: file.extension,
    };
  });

  const data = [mainFileData, ...otherFilesData];

  return {
    error: false,
    data,
  };
};

export const errorMessageToResult = (
  message: ErrorMessage
): TransformedResult => {
  return {
    data: null,
    error: true,
    message,
  };
};
