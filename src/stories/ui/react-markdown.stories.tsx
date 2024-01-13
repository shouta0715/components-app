import { Meta, StoryObj } from "@storybook/react";
import { ReactMarkdown } from "@/components/ui/react-markdown";

export default {
  component: ReactMarkdown,
} satisfies Meta<typeof ReactMarkdown>;

type Story = StoryObj<typeof ReactMarkdown>;

export const Default: Story = {
  tags: ["ui", "autodocs"],
  args: {
    children: `# Hello World`,
  },
};

export const Heading: Story = {
  ...Default,
  args: {
    children: `# Hello World\n## Hello World\n### Hello World\n#### Hello World\n##### Hello World\n###### Hello World`,
  },
};

export const Emphasis: Story = {
  ...Default,
  args: {
    children: `*イタリック体* \n **太字** \n ***太字イタリック体***\n~~打ち消し線~~`,
  },
};

export const List: Story = {
  ...Default,
  args: {
    children: `番号なしリスト\n - リスト1\n - リスト2\n - リスト3\n\n番号付きリスト\n 1. リスト1\n 2. リスト2\n 3. リスト3\n 
    こんにちは`,
  },
};

export const Blockquote: Story = {
  ...Default,
  args: {
    children: `> 引用文`,
  },
};

export const Link: Story = {
  ...Default,
  args: {
    children: `[リンク](https://example.com)`,
  },
};

export const Paragraph: Story = {
  ...Default,
  args: {
    children: `段落1\n\n段落2`,
  },
};

export const Code: Story = {
  ...Default,
  args: {
    children: `\`\`\`ts\nconsole.log("Hello World");\n\`\`\``,
  },
};

export const Table: Story = {
  ...Default,
  args: {
    children: `
| Property            | Type      | Description                                     |
| ------------------- | --------- | ----------------------------------------------- |
| \`Dialog\`            | Component | The main container for the dialog.              |
| \`DialogContent\`     | Component | Contains the content of the dialog.             |
| \`DialogHeader\`      | Component | The header section of the dialog.               |
| \`DialogTitle\`       | Component | Provides a title for the dialog.                |
| \`DialogDescription\` | Component | Gives a detailed description within the dialog. |
| \`DialogTrigger\`     | Component | Triggers the opening of the dialog.             |
`,
  },
};

export const InlineCode: Story = {
  ...Default,
  args: {
    children: "`Hello World`",
  },
};

export const TaskList: Story = {
  ...Default,
  args: {
    children: `- [x] Task1\n- [ ] Task2`,
  },
};

export const Details: Story = {
  ...Default,
  args: {
    children:
      "```detail タイトル\nHello World\nこんにちは\n[リンク](https://example.com)\n```\n\nHello World",
  },
};

const ALL_CHILDREN = `${Heading.args?.children}\n\n${Emphasis.args?.children}\n\n${List.args?.children}\n\n${Blockquote.args?.children}\n\n${Link.args?.children}\n\n${Paragraph.args?.children}\n\n${Code.args?.children}\n\n${Table.args?.children}\n\n${InlineCode.args?.children}\n\n${TaskList.args?.children}\n\n${Details.args?.children}`;

export const All: Story = {
  tags: ["ui"],
  args: {
    children: ALL_CHILDREN,
  },
};
