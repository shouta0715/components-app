import { cache, memo, use } from "react";

import { getShikiHighlighter } from "@/lib/client/shiki";
import { cn } from "@/utils";

type HighlightWithShikiProps = {
  code: string;
  lang: string;
};

const cacheShiki = cache(getShikiHighlighter);

export async function highlightWithShiki({
  code,
  lang,
}: HighlightWithShikiProps): Promise<string> {
  const highlighter = await cacheShiki();

  try {
    const html = highlighter.codeToHtml(code, {
      lang,
      theme: "github-dark-dimmed",
    });

    return html;
  } catch (e) {
    return highlighter.codeToHtml(code, {
      lang: "plaintext",
      theme: "github-dark-dimmed",
    });
  }
}

export type ShikiCodeProps = {
  children: string;
  lang: string;
  className?: string;
};

const cacheHighlight = cache(highlightWithShiki);

export const ShikiCode = memo(
  ({ children, lang, className }: ShikiCodeProps) => {
    const html = use(
      cacheHighlight({
        lang,
        code: children,
      })
    );

    return (
      <div
        className={cn("text-sm absolute", className)}
        style={{ overflow: "hidden" }}
      >
        <div
          className="[&>pre]:rounded-md [&>pre]:py-4 [&_.line]:px-4"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  }
);

export function ShikiLoading() {
  const code = `const code = "Loading...";`.trim();

  return (
    <div className="h-full bg-code p-4 text-sm">
      <pre className="text-primary-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
