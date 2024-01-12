import { expect } from "@storybook/jest";
import { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { Input } from "@/components/ui/input";

export default {
  component: Input,
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Template: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByRole("textbox");
    const text = "Hello World!";

    await userEvent.type(input, text);

    await expect(input).toHaveValue(text);
  },
};
