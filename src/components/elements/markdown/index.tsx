import { Markdown } from "@/components/elements/markdown/common";

export function ReactMarkdown({ children }: { children: string }) {
  return <Markdown>{children}</Markdown>;
}
