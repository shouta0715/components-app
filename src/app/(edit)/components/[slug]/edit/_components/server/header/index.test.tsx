import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import * as Stories from "./index.stories";
import * as History from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/section/index";

const spyHistory = vi
  .spyOn(History, "useRedirectSection")
  .mockImplementation((input) => {
    const { pathname, query } = mockRouter;

    return {
      onRedirect: (inputSection) => {
        const queries = {
          ...query,
          section: inputSection,
        };
        const newParams = new URLSearchParams(
          Object.entries(queries).map(([key, value]) => [key, String(value)])
        );
        mockRouter.setCurrentUrl(`${pathname}?${newParams.toString()}`);
      },
      push: mockRouter.push,
      currentSection: input,
      onNextSection: () => {},
      active: input === query.section,
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

      await userEvent.click(document);

      expect(mockRouter).toMatchObject({
        pathname: basePath,
        query: { section: "document" },
      });
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

      await userEvent.click(document);

      expect(mockRouter).toMatchObject({
        pathname: basePath,
        query: { section: "document" },
      });
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
