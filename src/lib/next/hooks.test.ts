import { renderHook } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useHistory } from "@/lib/next/hooks";

const spyHistoryPush = vi.spyOn(window.history, "pushState");
const spyHistoryReplace = vi.spyOn(window.history, "replaceState");

const pathname = "/";

describe("@/lib/next/hooks.ts", () => {
  describe("useHistory", () => {
    beforeEach(() => {
      mockRouter.setCurrentUrl(pathname);
    });

    afterEach(() => {
      spyHistoryPush.mockClear();
      spyHistoryReplace.mockClear();
    });

    describe("push", () => {
      test("called with params", () => {
        const { result } = renderHook(() => useHistory());

        const params = { foo: "bar" };
        result.current.push(params);

        expect(spyHistoryPush).toHaveBeenCalledWith(
          null,
          "",
          `${pathname}?foo=bar`
        );
      });

      test("if previous params exist, called with params", () => {
        mockRouter.setCurrentUrl(`${pathname}?foo=bar`);

        const { result } = renderHook(() => useHistory());

        const params = { hoge: "fuga" };
        result.current.push(params);

        expect(spyHistoryPush).toHaveBeenCalledWith(
          null,
          "",
          `${pathname}?foo=bar&hoge=fuga`
        );
      });
    });

    describe("replace", () => {
      test("called with params", () => {
        const { result } = renderHook(() => useHistory());

        const params = { foo: "bar" };
        result.current.replace(params);

        expect(spyHistoryReplace).toHaveBeenCalledWith(
          null,
          "",
          `${pathname}?foo=bar`
        );
      });

      test("if previous params exist, called with params", () => {
        mockRouter.setCurrentUrl(`${pathname}?foo=bar`);

        const { result } = renderHook(() => useHistory());

        const params = { hoge: "fuga" };
        result.current.replace(params);

        expect(spyHistoryReplace).toHaveBeenCalledWith(
          null,
          "",
          `${pathname}?foo=bar&hoge=fuga`
        );
      });
    });
  });
});
