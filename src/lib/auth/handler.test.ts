import "@/tests/mocks/session";
import { describe, expect, test, vi } from "vitest";
import { assertMine } from "@/lib/auth/handlers";

describe("@/lib/auth/handler", () => {
  describe("Function assertMine", async () => {
    test("call onError when target and my id is not equal", async () => {
      const onError: () => never = vi.fn();

      await assertMine("invalid", onError);

      expect(onError).toHaveBeenCalled();
    });
  });
});
