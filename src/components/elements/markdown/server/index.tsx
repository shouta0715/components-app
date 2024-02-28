/* eslint-disable tailwindcss/enforces-shorthand */
import { ComponentProps } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { NormalBrightCode } from "@/components/elements/code/server/bright-code";
import {
  CodeProps,
  MarkdownAccordion,
  MarkdownTable,
} from "@/components/elements/markdown/common";

import { cn } from "@/utils";

type ReactMarkdownProps = ComponentProps<typeof Markdown> & {
  children: string;
};

function MarkdownCode({ children, className, node, ...rest }: CodeProps) {
  const match = /language-(\w+)/.exec(className || "");
  const lang = match?.[1];

  if (lang === "detail") {
    return (
      <MarkdownAccordion className={className} node={node} {...rest}>
        {children}
      </MarkdownAccordion>
    );
  }

  return match ? (
    <NormalBrightCode {...rest} lang={lang === "bash" ? "text" : match[1]}>
      {String(children).replace(/\n$/, "")}
    </NormalBrightCode>
  ) : (
    <code
      className={cn(
        "bg-muted text-destructive py-2 px-2 rounded-md",
        className
      )}
      {...rest}
    >
      {children}
    </code>
  );
}

export function ReactMarkdown({ children, ...props }: ReactMarkdownProps) {
  return (
    <Markdown
      className="markdown"
      components={{
        code: MarkdownCode,
        table: MarkdownTable,
      }}
      remarkPlugins={[remarkGfm]}
      {...props}
    >
      {children}
    </Markdown>
  );
}
