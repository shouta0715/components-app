import { checkOverPage, getSkipPage } from "@/utils/pagination";

const mocks = vi.hoisted(() => {
  return {
    redirect: vi.fn(),
  };
});

vi.mock("next/navigation", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/navigation")>();

  return {
    ...actual,
    redirect: mocks.redirect,
  };
});

describe("utils/pagination", () => {
  describe("getSkipPage", () => {
    test("should return 0 if current is not provided", () => {
      expect(getSkipPage(undefined)).toBe(0);
    });

    test("should return 0 if current is not a number", () => {
      expect(getSkipPage("string")).toBe(0);
    });

    test("should return 0 if current is 0", () => {
      expect(getSkipPage(0)).toBe(0);
    });

    test("should return 20 if current is 1", () => {
      expect(getSkipPage(1)).toBe(0);
    });

    test("should return 40 if current is 2", () => {
      expect(getSkipPage(2)).toBe(20);
    });

    test("should return 60 if current is 3", () => {
      expect(getSkipPage(3)).toBe(40);
    });

    test("with custom take, should return 0 if current is 0", () => {
      expect(getSkipPage(0, 10)).toBe(0);
    });

    test("with custom take, should return 10 if current is 1", () => {
      expect(getSkipPage(1, 10)).toBe(0);

      expect(getSkipPage(2, 10)).toBe(10);

      expect(getSkipPage(3, 10)).toBe(20);
    });
  });

  describe("checkOverPage", () => {
    afterEach(() => {
      mocks.redirect.mockClear();
    });

    test("should redirect to last page if over", () => {
      checkOverPage({
        total: 20,
        current: 3,
        pathname: "/categories/name",
      });

      expect(mocks.redirect).toHaveBeenCalled();
    });

    test("should not redirect if not over", () => {
      checkOverPage({
        total: 20,
        current: 1,
        pathname: "/categories/name",
      });

      expect(mocks.redirect).not.toHaveBeenCalled();
    });

    test("should redirect to last page if over with string current", () => {
      checkOverPage({
        total: 12,
        current: "3",
        take: 10,
        pathname: "/categories/name",
      });

      expect(mocks.redirect).toHaveBeenCalled();
    });

    test("should redirect to last page if over with custom take", () => {
      checkOverPage({
        total: 30,
        current: 4,
        take: 10,
        pathname: "/categories/name",
      });

      expect(mocks.redirect).toHaveBeenCalled();
    });

    test("should not redirect if not over with custom take", () => {
      checkOverPage({
        total: 30,
        current: 1,
        take: 10,
        pathname: "/categories/name",
      });

      expect(mocks.redirect).not.toHaveBeenCalled();
    });

    test("if total is 0, should not redirect", () => {
      checkOverPage({
        total: 0,
        current: 1,
        pathname: "/categories/name",
      });

      expect(mocks.redirect).not.toHaveBeenCalled();
    });

    test("if total is 0, should not redirect with custom take", () => {
      checkOverPage({
        total: 0,
        current: 1,
        take: 10,
        pathname: "/categories/name",
      });

      expect(mocks.redirect).not.toHaveBeenCalled();
    });

    test("if take and total is same, should not redirect", () => {
      checkOverPage({
        total: 20,
        current: 1,
        take: 20,
        pathname: "/categories/name",
      });

      expect(mocks.redirect).not.toHaveBeenCalled();
    });
  });
});
