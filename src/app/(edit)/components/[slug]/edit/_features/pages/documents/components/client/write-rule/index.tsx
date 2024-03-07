import { HelpCircle } from "lucide-react";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const shortcuts = [
  {
    id: "bold",
    name: "太字",
    command: "command + b",
  },
];

export function MarkdownWriteRule() {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger>
        <span className="sr-only">書き方</span>
        <HelpCircle className="size-6" />
      </HoverCardTrigger>
      <HoverCardContent className="w-96 text-sm leading-7">
        <a
          className="underline underline-offset-2"
          href="https://docs.github.com/ja/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
          rel="noreferrer"
          target="_blank"
        >
          GitHub Flavored Markdown
        </a>
        に準拠したマークダウン記法で書くことができます。
        <br />
        <Accordion collapsible type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>ショートカット一覧</AccordionTrigger>
            <AccordionContent>
              <ol className="list-inside list-decimal	">
                {shortcuts.map((shortcut) => (
                  <li key={shortcut.id} className="font-semibold">
                    <span className="mb-2 inline-block ">{shortcut.name}</span>
                    <pre className="font-normal">{shortcut.command}</pre>
                  </li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </HoverCardContent>
    </HoverCard>
  );
}
