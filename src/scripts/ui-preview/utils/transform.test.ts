import { afterEach, describe, expect, test, vi } from "vitest";
import * as compiler from "@/scripts/ui-preview/compilers";
import { CodeBundlerError, CompilerError } from "@/scripts/ui-preview/errors";
import * as packages from "@/scripts/ui-preview/packages";
import { SuccessTransformedData } from "@/scripts/ui-preview/types";
import {
  fxCSSFile,
  fxGetFilesResult,
  fxHTMLFile,
  fxHTMLFileResult,
  fxJSFile,
  fxJSXFile,
  fxTSFile,
  fxTSXFile,
} from "@/scripts/ui-preview/utils/fixtures/transform";
import {
  transformWithHTML,
  transformWithoutHTML,
} from "@/scripts/ui-preview/utils/transform";

const spyCompiler = vi
  .spyOn(compiler, "compile")
  .mockImplementation(async (code) => ({
    result: code,
    error: false,
    message: "Successfully compiled",
  }));
const spyReplaceImports = vi.spyOn(packages, "replaceImports");

describe("scripts/ui-preview/utils/transform", async () => {
  afterEach(() => {
    spyCompiler.mockClear();
    spyReplaceImports.mockClear();
  });

  describe("Function transformWithHTML Test", async () => {
    test("HTML Only", async () => {
      const result = await transformWithHTML([fxHTMLFile], fxHTMLFile);

      expect(result.data).not.toBeNull();

      expect(result.data).toMatchObject<SuccessTransformedData>({
        files: [fxHTMLFileResult],
        componentName: null,
        action: "render",
      });
    });

    test("HTML with tsx", async () => {
      const result = await transformWithHTML(
        [fxHTMLFile, fxTSXFile],
        fxHTMLFile
      );

      expect(result.data).not.toBeNull();

      expect(result.data).toMatchObject<SuccessTransformedData>({
        files: [fxHTMLFileResult],
        componentName: null,
        action: "render",
      });
    });

    test("HTML with jsx ", async () => {
      const result = await transformWithHTML(
        [fxJSXFile, fxHTMLFile],
        fxHTMLFile
      );

      expect(result.data).not.toBeNull();

      expect(result.data).toStrictEqual<SuccessTransformedData>({
        files: [fxHTMLFileResult],
        componentName: null,
        action: "render",
      });
    });

    test("HTML with ts", async () => {
      const result = await transformWithHTML(
        [fxHTMLFile, fxTSFile],
        fxHTMLFile
      );

      expect(spyCompiler).toBeCalledTimes(1);

      expect(result.data).not.toBeNull();

      expect(result.data).toStrictEqual<SuccessTransformedData>({
        files: [
          fxHTMLFileResult,
          fxGetFilesResult({
            ...fxTSFile,
            extension: "js",
            originallyExtension: "ts",
          }),
        ],
        componentName: null,
        action: "render",
      });
    });

    test("HTML with css and ts", async () => {
      const result = await transformWithHTML(
        [fxHTMLFile, fxTSFile, fxCSSFile],
        fxHTMLFile
      );

      expect(spyCompiler).toBeCalledTimes(2);

      expect(result.data).not.toBeNull();

      expect(result.data).toStrictEqual<SuccessTransformedData>({
        files: [
          fxHTMLFileResult,
          fxGetFilesResult({
            ...fxTSFile,
            extension: "js",
            originallyExtension: "ts",
          }),
          fxGetFilesResult({
            ...fxCSSFile,
            extension: "css",
            originallyExtension: "css",
          }),
        ],
        componentName: null,
        action: "render",
      });
    });

    test("if html with tsx remove tsx file", async () => {
      const result = await transformWithHTML(
        [fxHTMLFile, fxTSXFile, fxTSFile],
        fxHTMLFile
      );

      expect(spyCompiler).toBeCalledTimes(1);

      expect(result.data).not.toBeNull();

      expect(result.data).toStrictEqual<SuccessTransformedData>({
        files: [
          fxHTMLFileResult,
          fxGetFilesResult({
            ...fxTSFile,
            extension: "js",
            originallyExtension: "ts",
          }),
        ],
        componentName: null,
        action: "render",
      });
    });

    test("throw compile error reject ", async () => {
      spyCompiler.mockImplementationOnce(async () => ({
        result: "",
        error: true,
        message: "output is empty",
      }));

      await expect(
        transformWithHTML([fxHTMLFile, fxTSXFile, fxTSFile], fxHTMLFile)
      ).rejects.toThrowError(CompilerError);
    });
  });

  describe("Function transformWithoutHTML Test", async () => {
    test("tsx", async () => {
      const result = await transformWithoutHTML([fxTSXFile]);

      expect(spyCompiler).toBeCalledTimes(1);

      expect(result.data).not.toBeNull();

      expect(result.data).toStrictEqual<SuccessTransformedData>({
        files: [
          fxGetFilesResult({
            ...fxTSXFile,
            extension: "js",
            originallyExtension: "tsx",
          }),
        ],
        componentName: "Example",
        action: "render",
      });
    });

    test("jsx", async () => {
      const result = await transformWithoutHTML([fxJSXFile]);

      expect(spyCompiler).toBeCalledTimes(1);
      expect(spyReplaceImports).toBeCalledTimes(1);

      expect(result.data).not.toBeNull();

      expect(result.data).toStrictEqual<SuccessTransformedData>({
        files: [
          fxGetFilesResult({
            ...fxJSXFile,
            extension: "js",
            originallyExtension: "jsx",
          }),
        ],
        componentName: "Example",
        action: "render",
      });
    });

    test("tsx and ts", async () => {
      const result = await transformWithoutHTML([fxTSXFile, fxTSFile]);

      expect(spyCompiler).toBeCalledTimes(2);
      expect(spyReplaceImports).toBeCalledTimes(2);

      expect(result.data).not.toBeNull();

      expect(result.data).toStrictEqual<SuccessTransformedData>({
        files: [
          fxGetFilesResult({
            ...fxTSXFile,
            extension: "js",
            originallyExtension: "tsx",
          }),
          fxGetFilesResult({
            ...fxTSFile,
            extension: "js",
            originallyExtension: "ts",
          }),
        ],
        componentName: "Example",
        action: "render",
      });
    });

    test("jsx and js", async () => {
      const result = await transformWithoutHTML([fxJSXFile, fxJSFile]);

      expect(spyCompiler).toBeCalledTimes(2);
      expect(spyReplaceImports).toBeCalledTimes(2);

      expect(result.data).not.toBeNull();

      expect(result.data).toStrictEqual<SuccessTransformedData>({
        files: [
          fxGetFilesResult({
            ...fxJSXFile,
            extension: "js",
            originallyExtension: "jsx",
          }),
          fxGetFilesResult({
            ...fxJSFile,
            extension: "js",
            originallyExtension: "js",
          }),
        ],
        componentName: "Example",
        action: "render",
      });
    });

    test("tsx and ts and css", async () => {
      const result = await transformWithoutHTML([
        fxTSXFile,
        fxTSFile,
        fxCSSFile,
      ]);

      expect(spyCompiler).toBeCalledTimes(3);
      expect(spyReplaceImports).toBeCalledTimes(2);

      expect(result.data).not.toBeNull();

      expect(result.data).toStrictEqual<SuccessTransformedData>({
        files: [
          fxGetFilesResult({
            ...fxTSXFile,
            extension: "js",
            originallyExtension: "tsx",
          }),
          fxGetFilesResult({
            ...fxTSFile,
            extension: "js",
            originallyExtension: "ts",
          }),
          fxGetFilesResult({
            ...fxCSSFile,
            extension: "css",
            originallyExtension: "css",
          }),
        ],
        componentName: "Example",
        action: "render",
      });
    });

    test("jsx and js and css", async () => {
      const result = await transformWithoutHTML([
        fxJSXFile,
        fxJSFile,
        fxCSSFile,
      ]);

      expect(spyCompiler).toBeCalledTimes(3);
      expect(spyReplaceImports).toBeCalledTimes(2);

      expect(result.data).not.toBeNull();

      expect(result.data).toStrictEqual<SuccessTransformedData>({
        files: [
          fxGetFilesResult({
            ...fxJSXFile,
            extension: "js",
            originallyExtension: "jsx",
          }),
          fxGetFilesResult({
            ...fxJSFile,
            extension: "js",
            originallyExtension: "js",
          }),
          fxGetFilesResult({
            ...fxCSSFile,
            extension: "css",
            originallyExtension: "css",
          }),
        ],
        componentName: "Example",
        action: "render",
      });
    });

    test("if tsx and jsx file is not exist throw error", async () => {
      await expect(transformWithoutHTML([fxTSFile])).rejects.toThrowError(
        CodeBundlerError
      );
    });

    test("throw compile error reject ", async () => {
      spyCompiler.mockImplementationOnce(async () => ({
        result: "",
        error: true,
        message: "output is empty",
      }));

      await expect(
        transformWithoutHTML([fxTSXFile, fxTSFile])
      ).rejects.toThrowError(CompilerError);
    });
  });
});
