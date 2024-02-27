import { describe, expect, test } from "vitest";
import { transformCode } from "@/scripts/ui-preview";
import {
  BadCombinationExtensionsError,
  CodeBundlerError,
  CompilerError,
  PackageError,
} from "@/scripts/ui-preview/errors";
import {
  RemoveNameFileObject,
  TransformedFile,
  TransformedResult,
} from "@/scripts/ui-preview/types";

const commonFile = {
  file: "file",
  componentId: "Example",
  id: "1",
};

const reactFile = "export function Example(){}";
const reactFile2 = "export const Mock = () => {}";
const functionName = "Example";
const functionName2 = "Mock";

function getResultFile(extension: string): TransformedFile {
  switch (extension) {
    case "html":
      return {
        content: "file",
        extension: "html",
        mimeType: "text/html",
        originallyExtension: undefined,
        id: "1",
      };
    case "css":
      return {
        content: "file{}\n",
        extension: "css",
        mimeType: "text/css",
        originallyExtension: "css",
        id: "1",
      };

    case "js":
      return {
        content: "file;\n",
        extension: "js",
        mimeType: "text/javascript",
        originallyExtension: "js",
        id: "1",
      };

    case "ts":
      return {
        content: "file;\n",
        extension: "js",
        mimeType: "text/javascript",
        originallyExtension: "ts",
        id: "1",
      };

    case "tsx":
      return {
        content: "function e(){}export{e as Example};\n",
        extension: "js",
        mimeType: "text/javascript",
        originallyExtension: "tsx",
        id: "1",
      };

    case "jsx":
      return {
        content: "function e(){}export{e as Example};\n",
        extension: "js",
        mimeType: "text/javascript",
        originallyExtension: "jsx",
        id: "1",
      };

    case "mock-tsx":
      return {
        content: "const o=()=>{};export{o as Mock};\n",
        extension: "js",
        mimeType: "text/javascript",
        originallyExtension: "tsx",
        id: "1",
      };

    case "mock-jsx":
      return {
        content: "const o=()=>{};export{o as Mock};\n",
        extension: "js",
        mimeType: "text/javascript",
        originallyExtension: "jsx",
        id: "1",
      };

    default:
      throw new Error(`Unexpected extension: ${extension}`);
  }
}

describe("scripts/ui-preview", () => {
  describe("Error cases transformCode", () => {
    test("Bad Combination Error", async () => {
      const input: RemoveNameFileObject[] = [
        { ...commonFile, extension: "html" },
        { ...commonFile, extension: "html" },
      ];

      expect(transformCode(input)).rejects.toThrowError(
        BadCombinationExtensionsError
      );
    });

    test("CodeBundlerError from transformWithoutHTML", async () => {
      const input: RemoveNameFileObject[] = [
        { ...commonFile, extension: "ts" },
        { ...commonFile, extension: "css" },
      ];

      expect(transformCode(input, functionName)).rejects.toThrowError(
        CodeBundlerError
      );
    });

    test("CompilerError from transformWithHTML", async () => {
      const input: RemoveNameFileObject[] = [
        { ...commonFile, extension: "html" },
        { ...commonFile, extension: "ts", file: "" },
      ];

      expect(transformCode(input)).rejects.toThrowError(CompilerError);
    });

    test("CompilerError from transformWithoutHTML", async () => {
      const input: RemoveNameFileObject[] = [
        { ...commonFile, extension: "tsx", file: reactFile },
        { ...commonFile, extension: "css", file: "" },
      ];

      expect(transformCode(input, functionName)).rejects.toThrowError(
        CompilerError
      );
    });

    test("PackageError from transformWithoutHTML", async () => {
      const input: RemoveNameFileObject[] = [
        { ...commonFile, extension: "tsx" },
        { ...commonFile, extension: "css" },
      ];

      expect(transformCode(input, functionName)).rejects.toThrowError(
        PackageError
      );
    });
  });
  describe("Success cases transformCode", () => {
    test("html and css", async () => {
      const input: RemoveNameFileObject[] = [
        { ...commonFile, extension: "html" },
        { ...commonFile, extension: "css" },
      ];

      const result = await transformCode(input);

      const resultFiles: TransformedFile[] = [
        getResultFile("html"),
        getResultFile("css"),
      ];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: null,
          action: "render",
          exportStyle: null,
          mainFileId: "1",
        },
      });
    });

    test("html and tsx", async () => {
      const input: RemoveNameFileObject[] = [
        { ...commonFile, extension: "html" },
        { ...commonFile, extension: "tsx" },
      ];

      const result = await transformCode(input);

      const resultFiles: TransformedFile[] = [getResultFile("html")];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: null,
          action: "render",
          exportStyle: null,
          mainFileId: "1",
        },
      });
    });

    test("html and css and js", async () => {
      const input: RemoveNameFileObject[] = [
        { ...commonFile, extension: "html" },
        { ...commonFile, extension: "css" },
        { ...commonFile, extension: "js" },
      ];

      const result = await transformCode(input);

      const resultFiles: TransformedFile[] = [
        getResultFile("html"),
        getResultFile("css"),
        getResultFile("js"),
      ];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: null,
          action: "render",
          exportStyle: null,
          mainFileId: "1",
        },
      });
    });

    test("html and tsx and ts", async () => {
      const input: RemoveNameFileObject[] = [
        { ...commonFile, extension: "html" },
        { ...commonFile, extension: "tsx" },
        { ...commonFile, extension: "ts" },
      ];

      const result = await transformCode(input);

      const resultFiles: TransformedFile[] = [
        getResultFile("html"),
        getResultFile("ts"),
      ];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: null,
          action: "render",
          exportStyle: null,
          mainFileId: "1",
        },
      });
    });

    test("tsx", async () => {
      const input: RemoveNameFileObject[] = [
        {
          ...commonFile,
          extension: "tsx",
          file: reactFile,
        },
      ];

      const result = await transformCode(input, functionName);

      const resultFiles: TransformedFile[] = [getResultFile("tsx")];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: "Example",
          action: "render",
          exportStyle: "named",
          mainFileId: "1",
        },
      });
    });

    test("jsx", async () => {
      const input: RemoveNameFileObject[] = [
        {
          ...commonFile,
          extension: "jsx",
          file: reactFile,
        },
      ];

      const result = await transformCode(input, functionName);

      const resultFiles: TransformedFile[] = [getResultFile("jsx")];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: "Example",
          action: "render",
          exportStyle: "named",
          mainFileId: "1",
        },
      });
    });

    test("tsx and ts", async () => {
      const input: RemoveNameFileObject[] = [
        {
          ...commonFile,
          extension: "tsx",
          file: reactFile,
        },
        { ...commonFile, extension: "ts" },
      ];

      const result = await transformCode(input, functionName);

      const resultFiles: TransformedFile[] = [
        getResultFile("tsx"),
        getResultFile("ts"),
      ];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: "Example",
          action: "render",
          exportStyle: "named",
          mainFileId: "1",
        },
      });
    });

    test("jsx and js", async () => {
      const input: RemoveNameFileObject[] = [
        {
          ...commonFile,
          extension: "jsx",
          file: reactFile,
        },
        { ...commonFile, extension: "js" },
      ];

      const result = await transformCode(input, functionName);

      const resultFiles: TransformedFile[] = [
        getResultFile("jsx"),
        getResultFile("js"),
      ];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: "Example",
          action: "render",
          exportStyle: "named",
          mainFileId: "1",
        },
      });
    });

    test("tsx and ts and css", async () => {
      const input: RemoveNameFileObject[] = [
        {
          ...commonFile,
          extension: "tsx",
          file: reactFile,
        },
        { ...commonFile, extension: "ts" },
        { ...commonFile, extension: "css" },
      ];

      const result = await transformCode(input, functionName);

      const resultFiles: TransformedFile[] = [
        getResultFile("tsx"),
        getResultFile("ts"),
        getResultFile("css"),
      ];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: "Example",
          action: "render",
          exportStyle: "named",
          mainFileId: "1",
        },
      });
    });

    test("jsx and js and css", async () => {
      const input: RemoveNameFileObject[] = [
        {
          ...commonFile,
          extension: "jsx",
          file: reactFile,
        },
        { ...commonFile, extension: "js" },
        { ...commonFile, extension: "css" },
      ];

      const result = await transformCode(input, functionName);

      const resultFiles: TransformedFile[] = [
        getResultFile("jsx"),
        getResultFile("js"),
        getResultFile("css"),
      ];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: "Example",
          action: "render",
          exportStyle: "named",
          mainFileId: "1",
        },
      });
    });

    test("tsx and tsx", async () => {
      const input: RemoveNameFileObject[] = [
        {
          ...commonFile,
          extension: "tsx",
          file: reactFile,
        },
        {
          ...commonFile,
          extension: "tsx",
          file: reactFile2,
        },
      ];

      const result = await transformCode(input, functionName);

      const resultFiles: TransformedFile[] = [
        getResultFile("tsx"),
        getResultFile("mock-tsx"),
      ];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: "Example",
          action: "render",
          exportStyle: "named",
          mainFileId: "1",
        },
      });

      const result2 = await transformCode(input, functionName2);

      const resultFiles2: TransformedFile[] = [
        getResultFile("tsx"),
        getResultFile("mock-tsx"),
      ];

      expect(result2).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles2,
          componentName: "Mock",
          action: "render",
          exportStyle: "named",
          mainFileId: "1",
        },
      });
    });
  });
});
