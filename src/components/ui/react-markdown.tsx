import { ClassAttributes, ComponentProps, HTMLAttributes } from "react";
import Markdown, { ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import { NormalBrightCode } from "@/components/ui/bright-code";

type ReactMarkdownProps = ComponentProps<typeof Markdown> & {
  children: string;
};

type CodeProps = ClassAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement> &
  ExtraProps;

function MarkdownCode({ children, className, node: _, ...rest }: CodeProps) {
  const match = /language-(\w+)/.exec(className || "");

  return match ? (
    <NormalBrightCode {...rest} lang={match[1] === "bash" ? "text" : match[1]}>
      {String(children).replace(/\n$/, "")}
    </NormalBrightCode>
  ) : (
    <code className={className} {...rest}>
      {children}
    </code>
  );
}

export function ReactMarkdown({ children, ...props }: ReactMarkdownProps) {
  return (
    <Markdown
      components={{
        code: MarkdownCode,
      }}
      remarkPlugins={[remarkGfm]}
      {...props}
    >
      {children}
    </Markdown>
  );
}
