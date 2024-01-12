import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/button";

export default {
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Template: Story = {
  args: {
    children: "Button",
  },
};
