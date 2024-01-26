import { expect } from "@storybook/jest";
import { Meta, StoryObj, StoryFn } from "@storybook/react";
import { within } from "@storybook/testing-library";
import { EditHeader } from "@/app/(edit)/components/[slug]/edit/_components/server/header";
import { editStatusAtom } from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import {
  CheckEditStatusData,
  EditStatus,
  EditingSteps,
} from "@/app/(edit)/components/[slug]/edit/_hooks/types";
import { getInitialEditStatus } from "@/app/(edit)/components/[slug]/edit/_hooks/utils";
import { NavigateTabs, TabsList } from "@/components/ui/tabs";
import { TestAtomProvider, setupNextParameter } from "@/tests/mocks/story";

const defaultData: CheckEditStatusData = {
  name: "name",
  document: "document",
  draft: true,
  fileLength: 1,
};

function createDecorators(
  data?: CheckEditStatusData,
  loading = false,
  section: EditingSteps = "summary"
) {
  const initialData: CheckEditStatusData = {
    ...defaultData,
    ...data,
  };

  const initialStatus = getInitialEditStatus(initialData, section);

  const loadingData: EditStatus = {
    ...initialStatus,
    [section]: {
      status: "LOADING",
      dataStatus: "CREATED",
    },
  };

  return (Story: StoryFn) => {
    return (
      <TestAtomProvider
        initialValues={[
          [editStatusAtom, loading ? loadingData : initialStatus],
        ]}
      >
        <NavigateTabs defaultValue="summary" params="section">
          <TabsList className="block h-auto items-center bg-transparent p-0 text-primary">
            <Story />
          </TabsList>
        </NavigateTabs>
      </TestAtomProvider>
    );
  };
}

export default {
  title: "app/components/edit/server/header",
  component: EditHeader,
  tags: ["server", "app", "autodocs"],
  decorators: [createDecorators()],
  parameters: setupNextParameter("components/xxx/edit", {
    section: "summary",
  }),
} satisfies Meta<typeof EditHeader>;

type Story = StoryObj<typeof EditHeader>;

export const Default: Story = {};

export const Empty: Story = {
  decorators: [
    createDecorators({
      name: "",
      document: "",
      fileLength: 0,
      draft: true,
    }),
  ],
};

export const Loading: Story = {
  decorators: [
    createDecorators(
      {
        name: "",
        document: "",
        fileLength: 0,
        draft: true,
      },
      true
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const summary = canvas.getByRole("tab", { name: "summary" });

    expect(summary).toHaveAttribute("aria-disabled", "true");

    const files = canvas.getByRole("tab", { name: "files" });
    const document = canvas.getByRole("tab", { name: "document" });

    expect(files).toHaveAttribute("aria-disabled", "true");
    expect(document).toHaveAttribute("aria-disabled", "true");

    expect(summary).toHaveAttribute("aria-selected", "true");
    expect(files).toHaveAttribute("aria-selected", "false");
    expect(document).toHaveAttribute("aria-selected", "false");

    expect(summary).toBeDisabled();
    expect(files).toBeDisabled();
    expect(document).toBeDisabled();

    expect(summary).toHaveAttribute("aria-current", "page");
  },
};
