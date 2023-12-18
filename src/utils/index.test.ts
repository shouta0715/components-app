import { describe, expect, test } from "vitest";
import { getDisplayName } from "@/utils";

describe("utils", () => {
  describe("getDisplayName", () => {
    test("should return Unknown if name is null", () => {
      expect(getDisplayName(null)).toBe("Unknown");

      expect(getDisplayName(null, 3)).toBe("Unknown");
    });

    test("should return Unknown if name is undefined", () => {
      expect(getDisplayName(undefined)).toBe("Unknown");

      expect(getDisplayName(undefined, 3)).toBe("Unknown");
    });

    test("should return Unknown if name is empty", () => {
      expect(getDisplayName("")).toBe("Unknown");

      expect(getDisplayName("", 3)).toBe("Unknown");
    });

    test("if slice is not provided, should return name", () => {
      expect(getDisplayName("name")).toBe("name");
    });

    test("should return name if name length is less than slice", () => {
      expect(getDisplayName("name", 5)).toBe("name");

      expect(getDisplayName("name", 4)).toBe("name");
    });

    test("should return name if name length is equal to slice", () => {
      expect(getDisplayName("name", 4)).toBe("name");
    });

    test("should return name if name length is greater than slice", () => {
      expect(getDisplayName("name", 3)).toBe("nam...");

      expect(getDisplayName("name", 2)).toBe("na...");

      expect(getDisplayName("name", 1)).toBe("n...");
    });
  });
});
