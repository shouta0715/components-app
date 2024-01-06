import { describe, expect, test } from "vitest";
import { PackageError } from "@/scripts/ui-preview/errors";
import {
  getExportComponentName,
  replaceImports,
} from "@/scripts/ui-preview/packages";
import {
  FX_CONST_ARROW_FUNCTION_COMPONENT,
  FX_DEFAULT_NAMED_FUNCTION_COMPONENT,
  FX_DEFAULT_VARIABLE_COMPONENT,
  FX_EXPECT_COMPONENT_NAME,
  FX_NAMED_COMPONENT,
  FX_NAMED_FUNCTION_COMPONENT,
  FX_NO_EXPORT_COMPONENT,
} from "@/scripts/ui-preview/packages/fixtures/export-name";
import {
  FX_DEFAULT_IMPORT,
  FX_DYNAMIC_IMPORT,
  FX_MINIFIED_STUCK_IMPORT,
  FX_MULTI_IMPORT,
  FX_NAMED_IMPORT,
  FX_NOT_LIBRARY_IMPORT,
  FX_STUCK_IMPORT,
} from "@/scripts/ui-preview/packages/fixtures/replace";

describe("scripts/ui-preview/packages", async () => {
  describe("Function getExportComponentName Test", async () => {
    test("Export Named Function", async () => {
      const result = getExportComponentName(FX_NAMED_FUNCTION_COMPONENT);
      expect(result).toBe(FX_EXPECT_COMPONENT_NAME);
    });

    test("Export Const Arrow Function", async () => {
      const result = getExportComponentName(FX_CONST_ARROW_FUNCTION_COMPONENT);
      expect(result).toBe(FX_EXPECT_COMPONENT_NAME);
    });

    test("Export Default Named Function", async () => {
      const result = getExportComponentName(
        FX_DEFAULT_NAMED_FUNCTION_COMPONENT
      );
      expect(result).toBe(FX_EXPECT_COMPONENT_NAME);
    });

    test("Export Default Variable", async () => {
      const result = getExportComponentName(FX_DEFAULT_VARIABLE_COMPONENT);
      expect(result).toBe(FX_EXPECT_COMPONENT_NAME);
    });

    test("Export Named", async () => {
      const result = getExportComponentName(FX_NAMED_COMPONENT);
      expect(result).toBe(FX_EXPECT_COMPONENT_NAME);
    });

    test("No Export", async () => {
      expect(() => getExportComponentName(FX_NO_EXPORT_COMPONENT)).toThrow(
        PackageError
      );
    });
  });
  describe("replaceImports", async () => {
    test("Named Import", async () => {
      const { expected, target } = FX_NAMED_IMPORT;
      const result = replaceImports(target);

      expect(result).toBe(expected);
    });

    test("Default Import", async () => {
      const { expected, target } = FX_DEFAULT_IMPORT;
      const result = replaceImports(target);

      expect(result).toBe(expected);
    });

    test("Dynamic Import", async () => {
      const { expected, target } = FX_DYNAMIC_IMPORT;
      const result = replaceImports(target);

      expect(result).toBe(expected);
    });

    test("Multi Import", async () => {
      const { expected, target } = FX_MULTI_IMPORT;
      const result = replaceImports(target);

      expect(result).toBe(expected);
    });

    test("Stuck Import", async () => {
      const { expected, target } = FX_STUCK_IMPORT;
      const result = replaceImports(target);

      expect(result).toBe(expected);
    });

    test("Minified Stuck Import", async () => {
      const { expected, target } = FX_MINIFIED_STUCK_IMPORT;
      const result = replaceImports(target);

      expect(result).toBe(expected);
    });

    test("Not Library Import", async () => {
      const { expected, target } = FX_NOT_LIBRARY_IMPORT;
      const result = replaceImports(target);

      expect(result).toBe(expected);
    });
  });
});
