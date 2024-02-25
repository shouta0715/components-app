import { describe, expect, test } from "vitest";
import { PackageError } from "@/scripts/ui-preview/errors";
import {
  getExportComponentName,
  replaceImports,
} from "@/scripts/ui-preview/packages";
import {
  FX_CONST_ARROW_CHANGE_COMPONENT,
  FX_CONST_ARROW_FUNCTION_COMPONENT,
  FX_DEFAULT_NAMED_CHANGE_COMPONENT,
  FX_DEFAULT_NAMED_FUNCTION_COMPONENT,
  FX_DEFAULT_VARIABLE_CHANGE_COMPONENT,
  FX_DEFAULT_VARIABLE_COMPONENT,
  FX_DOUBLE_EXPORT,
  FX_EXPECT_CHANGE_NAME,
  FX_EXPECT_COMPONENT_NAME,
  FX_NAMED_CHANGE,
  FX_NAMED_CHANGE_COMPONENT,
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
    describe("Single Component", async () => {
      test("Export Named Function", async () => {
        const { exportStyle } = getExportComponentName(
          [FX_NAMED_FUNCTION_COMPONENT],
          FX_EXPECT_COMPONENT_NAME
        );
        expect(exportStyle).toBe("named");
      });

      test("Export Const Arrow Function", async () => {
        const { exportStyle } = getExportComponentName(
          [FX_CONST_ARROW_FUNCTION_COMPONENT],
          FX_EXPECT_COMPONENT_NAME
        );
        expect(exportStyle).toBe("named");
      });

      test("Export Default Named Function", async () => {
        const { exportStyle } = getExportComponentName(
          [FX_DEFAULT_NAMED_FUNCTION_COMPONENT],
          FX_EXPECT_COMPONENT_NAME
        );

        expect(exportStyle).toBe("default");
      });

      test("Export Default Variable", async () => {
        const { exportStyle } = getExportComponentName(
          [FX_DEFAULT_VARIABLE_COMPONENT],
          FX_EXPECT_COMPONENT_NAME
        );

        expect(exportStyle).toBe("default");
      });

      test("Export Named", async () => {
        const { exportStyle } = getExportComponentName(
          [FX_NAMED_COMPONENT],
          FX_EXPECT_COMPONENT_NAME
        );

        expect(exportStyle).toBe("named");
      });

      test("No Export", async () => {
        expect(() =>
          getExportComponentName(
            [FX_NO_EXPORT_COMPONENT],
            FX_EXPECT_COMPONENT_NAME
          )
        ).toThrow(PackageError);
      });
    });

    describe("Multiple Component", async () => {
      describe("Named Component", async () => {
        test("Named and Named", async () => {
          const { exportStyle } = getExportComponentName(
            [FX_NAMED_FUNCTION_COMPONENT, FX_NAMED_CHANGE_COMPONENT],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle).toBe("named");

          const { exportStyle: exportStyle2 } = getExportComponentName(
            [FX_NAMED_CHANGE_COMPONENT, FX_NAMED_FUNCTION_COMPONENT],
            FX_EXPECT_CHANGE_NAME
          );

          expect(exportStyle2).toBe("named");
        });

        test("Named and Default", async () => {
          const { exportStyle } = getExportComponentName(
            [FX_NAMED_FUNCTION_COMPONENT, FX_DEFAULT_NAMED_CHANGE_COMPONENT],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle).toBe("named");

          const { exportStyle: exportStyle2 } = getExportComponentName(
            [
              FX_DEFAULT_NAMED_FUNCTION_COMPONENT,
              FX_DEFAULT_NAMED_CHANGE_COMPONENT,
            ],
            FX_EXPECT_CHANGE_NAME
          );

          expect(exportStyle2).toBe("default");
        });

        test("Named and arrow", async () => {
          const { exportStyle } = getExportComponentName(
            [FX_NAMED_FUNCTION_COMPONENT, FX_CONST_ARROW_CHANGE_COMPONENT],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle).toBe("named");

          const { exportStyle: exportStyle2 } = getExportComponentName(
            [
              FX_CONST_ARROW_FUNCTION_COMPONENT,
              FX_CONST_ARROW_CHANGE_COMPONENT,
            ],
            FX_EXPECT_CHANGE_NAME
          );

          expect(exportStyle2).toBe("named");
        });

        test("Named and default Variables", async () => {
          const { exportStyle } = getExportComponentName(
            [FX_NAMED_FUNCTION_COMPONENT, FX_DEFAULT_VARIABLE_CHANGE_COMPONENT],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle).toBe("named");

          const { exportStyle: exportStyle2 } = getExportComponentName(
            [
              FX_DEFAULT_VARIABLE_COMPONENT,
              FX_DEFAULT_VARIABLE_CHANGE_COMPONENT,
            ],
            FX_EXPECT_CHANGE_NAME
          );

          expect(exportStyle2).toBe("default");
        });

        test("Named and Named Object", async () => {
          const { exportStyle } = getExportComponentName(
            [FX_NAMED_FUNCTION_COMPONENT, FX_NAMED_CHANGE],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle).toBe("named");

          const { exportStyle: exportStyle2 } = getExportComponentName(
            [FX_NAMED_CHANGE, FX_NAMED_FUNCTION_COMPONENT],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle2).toBe("named");
        });

        test("Double Named", async () => {
          const { exportStyle } = getExportComponentName(
            [FX_DOUBLE_EXPORT],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle).toBe("named");

          const { exportStyle: exportStyle2 } = getExportComponentName(
            [FX_DOUBLE_EXPORT],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle2).toBe("named");
        });
      });

      describe("Default Component", async () => {
        test("Default and Default", async () => {
          const { exportStyle } = getExportComponentName(
            [
              FX_DEFAULT_NAMED_FUNCTION_COMPONENT,
              FX_DEFAULT_NAMED_CHANGE_COMPONENT,
            ],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle).toBe("default");

          const { exportStyle: exportStyle2 } = getExportComponentName(
            [
              FX_DEFAULT_NAMED_CHANGE_COMPONENT,
              FX_DEFAULT_NAMED_FUNCTION_COMPONENT,
            ],
            FX_EXPECT_CHANGE_NAME
          );

          expect(exportStyle2).toBe("default");
        });

        test("Default and Arrow", async () => {
          const { exportStyle } = getExportComponentName(
            [
              FX_DEFAULT_NAMED_FUNCTION_COMPONENT,
              FX_CONST_ARROW_CHANGE_COMPONENT,
            ],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle).toBe("default");

          const { exportStyle: exportStyle2 } = getExportComponentName(
            [FX_NAMED_FUNCTION_COMPONENT, FX_CONST_ARROW_CHANGE_COMPONENT],
            FX_EXPECT_CHANGE_NAME
          );

          expect(exportStyle2).toBe("named");
        });

        test("Default and Default Variable", async () => {
          const { exportStyle } = getExportComponentName(
            [
              FX_DEFAULT_NAMED_FUNCTION_COMPONENT,
              FX_DEFAULT_VARIABLE_CHANGE_COMPONENT,
            ],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle).toBe("default");

          const { exportStyle: exportStyle2 } = getExportComponentName(
            [
              FX_DEFAULT_VARIABLE_COMPONENT,
              FX_DEFAULT_VARIABLE_CHANGE_COMPONENT,
            ],
            FX_EXPECT_CHANGE_NAME
          );

          expect(exportStyle2).toBe("default");
        });

        test("Default and Named Object", async () => {
          const { exportStyle } = getExportComponentName(
            [FX_DEFAULT_NAMED_FUNCTION_COMPONENT, FX_NAMED_CHANGE],
            FX_EXPECT_COMPONENT_NAME
          );

          expect(exportStyle).toBe("default");

          const { exportStyle: exportStyle2 } = getExportComponentName(
            [FX_NAMED_CHANGE, FX_DEFAULT_NAMED_FUNCTION_COMPONENT],
            FX_EXPECT_CHANGE_NAME
          );

          expect(exportStyle2).toBe("named");
        });
      });

      describe("Arrow Component", async () => {
        test("Arrow and Arrow", async () => {
          const { exportStyle } = getExportComponentName(
            [
              FX_CONST_ARROW_FUNCTION_COMPONENT,
              FX_CONST_ARROW_CHANGE_COMPONENT,
            ],
            FX_EXPECT_COMPONENT_NAME
          );
          expect(exportStyle).toBe("named");
          const { exportStyle: exportStyle2 } = getExportComponentName(
            [
              FX_CONST_ARROW_CHANGE_COMPONENT,
              FX_CONST_ARROW_FUNCTION_COMPONENT,
            ],
            FX_EXPECT_CHANGE_NAME
          );
          expect(exportStyle2).toBe("named");
        });

        test("Arrow and Default Variable", async () => {
          const { exportStyle } = getExportComponentName(
            [
              FX_CONST_ARROW_FUNCTION_COMPONENT,
              FX_DEFAULT_VARIABLE_CHANGE_COMPONENT,
            ],
            FX_EXPECT_COMPONENT_NAME
          );
          expect(exportStyle).toBe("named");
          const { exportStyle: exportStyle2 } = getExportComponentName(
            [
              FX_CONST_ARROW_FUNCTION_COMPONENT,
              FX_DEFAULT_VARIABLE_CHANGE_COMPONENT,
            ],
            FX_EXPECT_CHANGE_NAME
          );
          expect(exportStyle2).toBe("default");
        });

        test("Arrow and Named Object", async () => {
          const { exportStyle } = getExportComponentName(
            [FX_CONST_ARROW_FUNCTION_COMPONENT, FX_NAMED_CHANGE],
            FX_EXPECT_COMPONENT_NAME
          );
          expect(exportStyle).toBe("named");
          const { exportStyle: exportStyle2 } = getExportComponentName(
            [FX_NAMED_CHANGE, FX_CONST_ARROW_FUNCTION_COMPONENT],
            FX_EXPECT_CHANGE_NAME
          );
          expect(exportStyle2).toBe("named");
        });
      });

      describe("Default Variable Component", async () => {
        test("Default Variable and Default Variable", async () => {
          const { exportStyle } = getExportComponentName(
            [
              FX_DEFAULT_VARIABLE_COMPONENT,
              FX_DEFAULT_VARIABLE_CHANGE_COMPONENT,
            ],
            FX_EXPECT_COMPONENT_NAME
          );
          expect(exportStyle).toBe("default");
          const { exportStyle: exportStyle2 } = getExportComponentName(
            [
              FX_DEFAULT_VARIABLE_CHANGE_COMPONENT,
              FX_DEFAULT_VARIABLE_COMPONENT,
            ],
            FX_EXPECT_CHANGE_NAME
          );
          expect(exportStyle2).toBe("default");
        });

        test("Default Variable and Named Object", async () => {
          const { exportStyle } = getExportComponentName(
            [FX_DEFAULT_VARIABLE_COMPONENT, FX_NAMED_CHANGE],
            FX_EXPECT_COMPONENT_NAME
          );
          expect(exportStyle).toBe("default");
          const { exportStyle: exportStyle2 } = getExportComponentName(
            [FX_NAMED_CHANGE, FX_DEFAULT_VARIABLE_COMPONENT],
            FX_EXPECT_CHANGE_NAME
          );
          expect(exportStyle2).toBe("named");
        });
      });

      describe("Named Object Component", async () => {
        test("Named Object and Named Object", async () => {
          const { exportStyle } = getExportComponentName(
            [FX_NAMED_COMPONENT, FX_NAMED_CHANGE],
            FX_EXPECT_COMPONENT_NAME
          );
          expect(exportStyle).toBe("named");
          const { exportStyle: exportStyle2 } = getExportComponentName(
            [FX_NAMED_CHANGE, FX_NAMED_COMPONENT],
            FX_EXPECT_COMPONENT_NAME
          );
          expect(exportStyle2).toBe("named");
        });
      });
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
