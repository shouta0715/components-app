import { describe, expect, test } from "vitest";
import { compile } from "@/scripts/ui-preview/compilers";
import { CompilerError } from "@/scripts/ui-preview/errors";

describe("scripts/ui-preview/compile", () => {
  test("if input is html throw CompileError", async () => {
    expect(compile("", "html")).rejects.toThrowError(CompilerError);
  });
});
