import React from "react";
import { ReactMarkdown } from "@/components/elements/markdown/server";

export function ComponentDocument({ children }: { children: string }) {
  return (
    <section className="w-full overflow-hidden">
      <ReactMarkdown>{children}</ReactMarkdown>
    </section>
  );
}
