import React from "react";
import { ReactMarkdown } from "@/components/ui/react-markdown";

export function ComponentDocument({ children }: { children: string }) {
  return (
    <section className="w-full overflow-hidden">
      <ReactMarkdown>{children}</ReactMarkdown>
    </section>
  );
}
