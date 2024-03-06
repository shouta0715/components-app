import React from "react";
import { Markdown } from "@/components/elements/markdown/common";

export function ComponentDocument({ children }: { children: string }) {
  return (
    <section className="w-full overflow-hidden">
      <Markdown>{children}</Markdown>
    </section>
  );
}
