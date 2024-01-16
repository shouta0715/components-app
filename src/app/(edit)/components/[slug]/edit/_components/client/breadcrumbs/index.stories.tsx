import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Provider } from "jotai";
import { EditBreadcrumbs } from "@/app/(edit)/components/[slug]/edit/_components/client/breadcrumbs";
import { HydrateEditAtom } from "@/app/(edit)/components/[slug]/edit/_components/client/hydrate-atom";
import { EditStatus } from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { setupNextParameter } from "@/tests/mocks/story";

function createDecorators(initialEditStatus: EditStatus) {
  return (Story: StoryFn) => {
    return (
      <Provider>
        <HydrateEditAtom initialEditStatus={initialEditStatus}>
          <Story />
        </HydrateEditAtom>
      </Provider>
    );
  };
}

export default {
  title: "components/edit/edit-breadcrumbs",
  component: EditBreadcrumbs,
  parameters: setupNextParameter("/edit/summary"),
} satisfies Meta<typeof EditBreadcrumbs>;

type Story = StoryObj<typeof EditBreadcrumbs>;

export const Default: Story = {
  args: {},
  decorators: [
    createDecorators({
      Summary: "EDITING",
      Files: "EMPTY",
      Document: "EMPTY",
    }),
  ],
};

export const EditingEmptySummary: Story = {
  args: {},
  decorators: [
    createDecorators({
      Summary: "EMPTY_EDITING",
      Files: "EMPTY",
      Document: "EMPTY",
    }),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const summary = canvas.getByRole("link", { name: "Summary" });
    const files = canvas.getByRole("link", { name: "Files" });
    const document = canvas.getByRole("link", { name: "Document" });

    await expect(summary).toHaveAttribute("aria-disabled", "false");
    await expect(summary).toHaveAttribute("aria-current", "page");

    await expect(files).toHaveAttribute("aria-disabled", "true");
    await expect(document).toHaveAttribute("aria-disabled", "true");
  },
};

export const EditingEmptyFiles: Story = {
  args: {},
  decorators: [
    createDecorators({
      Summary: "CREATED",
      Files: "EMPTY_EDITING",
      Document: "EMPTY",
    }),
  ],
  parameters: setupNextParameter("/edit/files"),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const summary = canvas.getByRole("link", { name: "Summary" });
    const files = canvas.getByRole("link", { name: "Files" });
    const document = canvas.getByRole("link", { name: "Document" });

    await expect(summary).toHaveAttribute("aria-disabled", "false");
    await expect(files).toHaveAttribute("aria-disabled", "false");
    await expect(files).toHaveAttribute("aria-current", "page");

    await expect(document).toHaveAttribute("aria-disabled", "true");
  },
};

export const EditingEmptyDocument: Story = {
  args: {},
  decorators: [
    createDecorators({
      Summary: "CREATED",
      Files: "CREATED",
      Document: "EMPTY_EDITING",
    }),
  ],
  parameters: setupNextParameter("/edit/document"),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const summary = canvas.getByRole("link", { name: "Summary" });
    const files = canvas.getByRole("link", { name: "Files" });
    const document = canvas.getByRole("link", { name: "Document" });

    await expect(summary).toHaveAttribute("aria-disabled", "false");
    await expect(files).toHaveAttribute("aria-disabled", "false");
    await expect(document).toHaveAttribute("aria-disabled", "false");
    await expect(document).toHaveAttribute("aria-current", "page");
  },
};
export const ALLCreated: Story = {
  args: {},
  decorators: [
    createDecorators({
      Summary: "CREATED",
      Files: "CREATED",
      Document: "CREATED",
    }),
  ],
  parameters: setupNextParameter("/edit/document"),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const summary = canvas.getByRole("link", { name: "Summary" });
    const files = canvas.getByRole("link", { name: "Files" });
    const document = canvas.getByRole("link", { name: "Document" });

    await expect(summary).toHaveAttribute("aria-disabled", "false");
    await expect(files).toHaveAttribute("aria-disabled", "false");
    await expect(document).toHaveAttribute("aria-disabled", "false");
    await expect(document).toHaveAttribute("aria-current", "page");
  },
};

export const EditingSummary: Story = {
  args: {},
  decorators: [
    createDecorators({
      Summary: "EDITING",
      Files: "CREATED",
      Document: "CREATED",
    }),
  ],
  parameters: setupNextParameter("/edit/summary"),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const summary = canvas.getByRole("link", { name: "Summary" });
    const files = canvas.getByRole("link", { name: "Files" });
    const document = canvas.getByRole("link", { name: "Document" });

    await expect(summary).toHaveAttribute("aria-disabled", "false");
    await expect(summary).toHaveAttribute("aria-current", "page");

    await expect(files).toHaveAttribute("aria-disabled", "false");
    await expect(document).toHaveAttribute("aria-disabled", "false");
  },
};

export const EditingFiles: Story = {
  args: {},
  decorators: [
    createDecorators({
      Summary: "CREATED",
      Files: "EDITING",
      Document: "CREATED",
    }),
  ],
  parameters: setupNextParameter("/edit/files"),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const summary = canvas.getByRole("link", { name: "Summary" });
    const files = canvas.getByRole("link", { name: "Files" });
    const document = canvas.getByRole("link", { name: "Document" });

    await expect(summary).toHaveAttribute("aria-disabled", "false");
    await expect(files).toHaveAttribute("aria-disabled", "false");
    await expect(files).toHaveAttribute("aria-current", "page");

    await expect(document).toHaveAttribute("aria-disabled", "false");
  },
};

export const EditingDocument: Story = {
  args: {},
  decorators: [
    createDecorators({
      Summary: "CREATED",
      Files: "CREATED",
      Document: "EDITING",
    }),
  ],
  parameters: setupNextParameter("/edit/document"),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const summary = canvas.getByRole("link", { name: "Summary" });
    const files = canvas.getByRole("link", { name: "Files" });
    const document = canvas.getByRole("link", { name: "Document" });

    await expect(summary).toHaveAttribute("aria-disabled", "false");
    await expect(files).toHaveAttribute("aria-disabled", "false");
    await expect(document).toHaveAttribute("aria-disabled", "false");
    await expect(document).toHaveAttribute("aria-current", "page");
  },
};

export const LoadingSummary: Story = {
  args: {},
  decorators: [
    createDecorators({
      Summary: "LOADING",
      Files: "CREATED",
      Document: "CREATED",
    }),
  ],
  parameters: setupNextParameter("/edit/summary"),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const summary = canvas.getByRole("link", { name: "Summary" });
    const files = canvas.getByRole("link", { name: "Files" });
    const document = canvas.getByRole("link", { name: "Document" });

    await expect(summary).toHaveAttribute("aria-disabled", "true");
    await expect(summary).toHaveAttribute("aria-current", "page");

    await expect(files).toHaveAttribute("aria-disabled", "true");
    await expect(document).toHaveAttribute("aria-disabled", "true");
  },
};

export const LoadingFiles: Story = {
  args: {},
  decorators: [
    createDecorators({
      Summary: "CREATED",
      Files: "LOADING",
      Document: "CREATED",
    }),
  ],
  parameters: setupNextParameter("/edit/files"),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const summary = canvas.getByRole("link", { name: "Summary" });
    const files = canvas.getByRole("link", { name: "Files" });
    const document = canvas.getByRole("link", { name: "Document" });

    await expect(summary).toHaveAttribute("aria-disabled", "false");
    await expect(files).toHaveAttribute("aria-disabled", "true");
    await expect(files).toHaveAttribute("aria-current", "page");

    await expect(document).toHaveAttribute("aria-disabled", "true");
  },
};

export const LoadingDocument: Story = {
  args: {},
  decorators: [
    createDecorators({
      Summary: "CREATED",
      Files: "CREATED",
      Document: "LOADING",
    }),
  ],
  parameters: setupNextParameter("/edit/document"),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const summary = canvas.getByRole("link", { name: "Summary" });
    const files = canvas.getByRole("link", { name: "Files" });
    const document = canvas.getByRole("link", { name: "Document" });

    await expect(summary).toHaveAttribute("aria-disabled", "false");
    await expect(files).toHaveAttribute("aria-disabled", "false");
    await expect(document).toHaveAttribute("aria-disabled", "true");
    await expect(document).toHaveAttribute("aria-current", "page");
  },
};
