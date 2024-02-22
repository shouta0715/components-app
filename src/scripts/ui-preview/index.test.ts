import { describe, expect, test } from "vitest";
import { transformCode } from "@/scripts/ui-preview";
import {
  BadCombinationExtensionsError,
  CodeBundlerError,
  CompilerError,
  PackageError,
} from "@/scripts/ui-preview/errors";
import { TransformedFile, TransformedResult } from "@/scripts/ui-preview/types";
import { FileObject } from "@/services/files/get";

const commonFile = {
  file: "file",
  componentId: "Example",
};

const reactFile = "export function Example(){}";

function getResultFile(extension: string): TransformedFile {
  switch (extension) {
    case "html":
      return {
        content: "file",
        extension: "html",
        mimeType: "text/html",
        originallyExtension: undefined,
      };
    case "css":
      return {
        content: "file{}\n",
        extension: "css",
        mimeType: "text/css",
        originallyExtension: "css",
      };

    case "js":
      return {
        content: "file;\n",
        extension: "js",
        mimeType: "text/javascript",
        originallyExtension: "js",
      };

    case "ts":
      return {
        content: "file;\n",
        extension: "js",
        mimeType: "text/javascript",
        originallyExtension: "ts",
      };

    case "tsx":
      return {
        content: "function e(){}export{e as Example};\n",
        extension: "js",
        mimeType: "text/javascript",
        originallyExtension: "tsx",
      };

    case "jsx":
      return {
        content: "function e(){}export{e as Example};\n",
        extension: "js",
        mimeType: "text/javascript",
        originallyExtension: "jsx",
      };

    default:
      throw new Error(`Unexpected extension: ${extension}`);
  }
}

describe("scripts/ui-preview", () => {
  describe("Error cases transformCode", () => {
    test("Bad Combination Error", async () => {
      const input: FileObject[] = [
        { ...commonFile, extension: "html" },
        { ...commonFile, extension: "html" },
      ];

      expect(transformCode(input)).rejects.toThrowError(
        BadCombinationExtensionsError
      );
    });

    test("CodeBundlerError from transformWithoutHTML", async () => {
      const input: FileObject[] = [
        { ...commonFile, extension: "ts" },
        { ...commonFile, extension: "css" },
      ];

      expect(transformCode(input)).rejects.toThrowError(CodeBundlerError);
    });

    test("CompilerError from transformWithHTML", async () => {
      const input: FileObject[] = [
        { ...commonFile, extension: "html" },
        { ...commonFile, extension: "ts", file: "" },
      ];

      expect(transformCode(input)).rejects.toThrowError(CompilerError);
    });

    test("CompilerError from transformWithoutHTML", async () => {
      const input: FileObject[] = [
        { ...commonFile, extension: "tsx", file: reactFile },
        { ...commonFile, extension: "css", file: "" },
      ];

      expect(transformCode(input)).rejects.toThrowError(CompilerError);
    });

    test("PackageError from transformWithoutHTML", async () => {
      const input: FileObject[] = [
        { ...commonFile, extension: "tsx" },
        { ...commonFile, extension: "css" },
      ];

      expect(transformCode(input)).rejects.toThrowError(PackageError);
    });
  });
  describe("Success cases transformCode", () => {
    test("html and css", async () => {
      const input: FileObject[] = [
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
        },
      });
    });

    test("html and tsx", async () => {
      const input: FileObject[] = [
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
        },
      });
    });

    test("html and css and js", async () => {
      const input: FileObject[] = [
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
        },
      });
    });

    test("html and tsx and ts", async () => {
      const input: FileObject[] = [
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
        },
      });
    });

    test("tsx", async () => {
      const input: FileObject[] = [
        {
          ...commonFile,
          extension: "tsx",
          file: reactFile,
        },
      ];

      const result = await transformCode(input);

      const resultFiles: TransformedFile[] = [getResultFile("tsx")];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: "Example",
          action: "render",
          exportStyle: "named",
        },
      });
    });

    test("jsx", async () => {
      const input: FileObject[] = [
        {
          ...commonFile,
          extension: "jsx",
          file: reactFile,
        },
      ];

      const result = await transformCode(input);

      const resultFiles: TransformedFile[] = [getResultFile("jsx")];

      expect(result).toStrictEqual<TransformedResult>({
        data: {
          files: resultFiles,
          componentName: "Example",
          action: "render",
          exportStyle: "named",
        },
      });
    });

    test("tsx and ts", async () => {
      const input: FileObject[] = [
        {
          ...commonFile,
          extension: "tsx",
          file: reactFile,
        },
        { ...commonFile, extension: "ts" },
      ];

      const result = await transformCode(input);

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
        },
      });
    });

    test("jsx and js", async () => {
      const input: FileObject[] = [
        {
          ...commonFile,
          extension: "jsx",
          file: reactFile,
        },
        { ...commonFile, extension: "js" },
      ];

      const result = await transformCode(input);

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
        },
      });
    });

    test("tsx and ts and css", async () => {
      const input: FileObject[] = [
        {
          ...commonFile,
          extension: "tsx",
          file: reactFile,
        },
        { ...commonFile, extension: "ts" },
        { ...commonFile, extension: "css" },
      ];

      const result = await transformCode(input);

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
        },
      });
    });

    test("jsx and js and css", async () => {
      const input: FileObject[] = [
        {
          ...commonFile,
          extension: "jsx",
          file: reactFile,
        },
        { ...commonFile, extension: "js" },
        { ...commonFile, extension: "css" },
      ];

      const result = await transformCode(input);

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
        },
      });
    });
  });
});
