/* eslint-disable tailwindcss/enforces-shorthand */
import {
  ClassAttributes,
  ComponentProps,
  HTMLAttributes,
  TableHTMLAttributes,
} from "react";
import Markdown, { ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NormalBrightCode } from "@/components/ui/bright-code";
import { cn } from "@/utils";

type ReactMarkdownProps = ComponentProps<typeof Markdown> & {
  children: string;
};

type CodeProps = ClassAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement> &
  ExtraProps;

function MarkdownAccordion({
  children: _,
  className: __,
  node,
  ...rest
}: CodeProps) {
  const title =
    typeof node?.data?.meta === "string" ? node.data.meta : "Details";

  const contents = node?.children.reduce<string>((acc, child) => {
    if (child.type === "text") return acc + child.value;

    return acc;
  }, "");

  return (
    <Accordion collapsible id="accordion" type="single">
      <AccordionItem value="item-1">
        <AccordionTrigger className="mb-0 mt-0 text-base">
          {title}
        </AccordionTrigger>
        <AccordionContent id="accordion-content">
          <Markdown {...rest}>{contents}</Markdown>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

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

function MarkdownTable({
  ...props
}: ClassAttributes<HTMLTableElement> &
  TableHTMLAttributes<HTMLTableElement> &
  ExtraProps) {
  return (
    <div className="relative w-full overflow-auto">
      <table className="w-full caption-bottom text-sm" {...props} />
    </div>
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
