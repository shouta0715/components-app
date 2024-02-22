import { describe, expect, test } from "vitest";
import {
  getExtensionToMimeType,
  isBadCombination,
} from "@/scripts/ui-preview/utils";

describe("scripts/ui-preview/utils", async () => {
  describe("Function isBadCombination Test", async () => {
    test("Duplication", async () => {
      const result = isBadCombination(["js", "js"]);

      expect(result).toBe(true);

      const result2 = isBadCombination(["ts", "ts"]);

      expect(result2).toBe(true);

      const result3 = isBadCombination(["tsx", "tsx", "css"]);

      expect(result3).toBe(true);

      const result4 = isBadCombination(["jsx", "css"]);

      expect(result4).toBe(false);
    });

    test("Bad Combination", async () => {
      const result = isBadCombination(["js", "ts"]);
      expect(result).toBe(true);

      const result2 = isBadCombination(["ts", "js"]);
      expect(result2).toBe(true);

      const result3 = isBadCombination(["js", "tsx"]);
      expect(result3).toBe(true);

      const result4 = isBadCombination(["tsx", "js"]);
      expect(result4).toBe(true);

      const result5 = isBadCombination(["jsx", "ts"]);
      expect(result5).toBe(true);

      const result6 = isBadCombination(["ts", "jsx"]);
      expect(result6).toBe(true);

      const result7 = isBadCombination(["jsx", "tsx"]);
      expect(result7).toBe(true);

      const result8 = isBadCombination(["tsx", "jsx"]);
      expect(result8).toBe(true);

      const result9 = isBadCombination(["css", "tsx"]);

      expect(result9).toBe(false);
    });
  });

  describe("Function getExtensionToMimeType Test", async () => {
    test("html", async () => {
      const result = getExtensionToMimeType("html");

      expect(result).toBe("text/html");
    });

    test("css", async () => {
      const result = getExtensionToMimeType("css");

      expect(result).toBe("text/css");
    });

    test("js", async () => {
      const result = getExtensionToMimeType("js");

      expect(result).toBe("text/javascript");
    });

    test("other", async () => {
      expect(() => getExtensionToMimeType("ts")).toThrow();
      expect(() => getExtensionToMimeType("tsx")).toThrow();
      expect(() => getExtensionToMimeType("jsx")).toThrow();
    });
  });
});
