/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable tailwindcss/enforces-shorthand */
import { ClassAttributes, HTMLAttributes, TableHTMLAttributes } from "react";
import Markdown, { ExtraProps } from "react-markdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type CodeProps = ClassAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement> &
  ExtraProps;

export function MarkdownAccordion({
  children: _,
  className: __,
  node,
  ...rest
}: CodeProps) {
  const title =
    typeof (node?.data as any)?.meta === "string"
      ? (node?.data as any)?.meta ?? "Details"
      : "Details";

  const contents = node?.children.reduce<string>((acc, child) => {
    if (child.type === "text") return acc + child.value;

    return acc;
  }, "");

  return (
    <Accordion collapsible type="single">
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

export function MarkdownTable({
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
