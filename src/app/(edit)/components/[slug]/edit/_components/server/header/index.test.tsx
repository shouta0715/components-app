import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import * as Stories from "./index.stories";
import * as History from "@/lib/next/hooks";

const spyHistory = vi.spyOn(History, "useHistory").mockImplementation(() => {
  const { pathname, query } = mockRouter;

  return {
    push: (params) => {
      const queries = { ...query, ...params };
      const newParams = new URLSearchParams(
        Object.entries(queries).map(([key, value]) => [key, String(value)])
      );

      const newURL = `${pathname}?${newParams.toString()}`;

      mockRouter.setCurrentUrl(newURL);
    },
    replace: (params) => {
      const queries = { ...query, ...params };
      const newParams = new URLSearchParams(
        Object.entries(queries).map(([key, value]) => [key, String(value)])
      );

      const newURL = `${pathname}?${newParams.toString()}`;

      mockRouter.setCurrentUrl(newURL);
    },
  };
});

const { Default, Empty, Loading } = composeStories(Stories);
const basePath = "/components/xxx/edit";

describe("@app/components/[slug]/edit//server/header", async () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/components/xxx/edit?section=summary");
  });

  afterEach(() => {
    spyHistory.mockClear();
  });

  describe("Default", async () => {
    test("default selected tab should be summary", async () => {
      const { getByRole } = render(<Default />);

      const summary = getByRole("tab", { name: "summary" });
      const files = getByRole("tab", { name: "files" });
      const document = getByRole("tab", { name: "document" });

      expect(summary).toHaveAttribute("aria-selected", "true");
      expect(files).toHaveAttribute("aria-selected", "false");
      expect(document).toHaveAttribute("aria-selected", "false");

      await userEvent.click(files);

      expect(mockRouter).toMatchObject({
        pathname: basePath,
        query: { section: "files" },
      });

      expect(summary).toHaveAttribute("aria-selected", "false");
      expect(files).toHaveAttribute("aria-selected", "true");
      expect(document).toHaveAttribute("aria-selected", "false");

      await userEvent.click(document);

      expect(mockRouter).toMatchObject({
        pathname: basePath,
        query: { section: "document" },
      });

      expect(summary).toHaveAttribute("aria-selected", "false");
      expect(files).toHaveAttribute("aria-selected", "false");
      expect(document).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Empty", async () => {
    test("default selected tab should be summary", async () => {
      const { getByRole } = render(<Empty />);

      const summary = getByRole("tab", { name: "summary" });
      const files = getByRole("tab", { name: "files" });
      const document = getByRole("tab", { name: "document" });

      expect(summary).toHaveAttribute("aria-selected", "true");
      expect(files).toHaveAttribute("aria-selected", "false");
      expect(document).toHaveAttribute("aria-selected", "false");

      await userEvent.click(files);

      expect(mockRouter).toMatchObject({
        pathname: basePath,
        query: { section: "files" },
      });

      expect(summary).toHaveAttribute("aria-selected", "false");
      expect(files).toHaveAttribute("aria-selected", "true");
      expect(document).toHaveAttribute("aria-selected", "false");

      await userEvent.click(document);

      expect(mockRouter).toMatchObject({
        pathname: basePath,
        query: { section: "document" },
      });

      expect(summary).toHaveAttribute("aria-selected", "false");
      expect(files).toHaveAttribute("aria-selected", "false");
      expect(document).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Loading", async () => {
    test("if loading, all tabs should be disabled", async () => {
      const { getByRole } = render(<Loading />);

      const summary = getByRole("tab", { name: "summary" });
      const files = getByRole("tab", { name: "files" });
      const document = getByRole("tab", { name: "document" });

      expect(summary).toBeDisabled();
      expect(files).toBeDisabled();
      expect(document).toBeDisabled();

      expect(summary).toHaveAttribute("aria-selected", "true");
      expect(files).toHaveAttribute("aria-selected", "false");
      expect(document).toHaveAttribute("aria-selected", "false");

      expect(summary).toHaveAttribute("aria-disabled", "true");
      expect(files).toHaveAttribute("aria-disabled", "true");
      expect(document).toHaveAttribute("aria-disabled", "true");

      expect(summary).toHaveTextContent("Saving...");

      await userEvent.click(files);

      expect(mockRouter).toMatchObject({
        pathname: basePath,
        query: { section: "summary" },
      });
    });
  });
});
