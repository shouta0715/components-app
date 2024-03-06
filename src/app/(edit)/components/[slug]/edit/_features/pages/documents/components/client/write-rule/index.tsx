import { HelpCircle } from "lucide-react";
import Link from "next/link";
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

const extensions = [
  {
    id: "detail",
    name: "アコーディオン",
    written: "```detail <タイトル>\n <コンテンツ>\n```",
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
        拡張構文は、<span className="font-bold">コードブロック + 記法名</span>
        で記述します。以下は利用可能な拡張構文の一覧です。
        <br />
        どのように表示されるかは、
        <Link
          className="inline underline underline-offset-2"
          href="/markdown/preview"
        >
          こちら
        </Link>
        で確認できます。
        <br />※ 拡張構文内でコードブロックは使用できません。
        <Accordion collapsible type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>拡張構文一覧</AccordionTrigger>
            <AccordionContent>
              <ol className="list-inside list-decimal	">
                {extensions.map((extension) => (
                  <li key={extension.id} className="font-semibold">
                    <span className="mb-2 inline-block ">{extension.name}</span>
                    <pre className="font-normal">{extension.written}</pre>
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
