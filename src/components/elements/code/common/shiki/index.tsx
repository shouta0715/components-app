import { cache, memo, use } from "react";

import { BuiltinLanguage, codeToHtml } from "shiki";
import { cn } from "@/utils";

type HighlightWithShikiProps = {
  code: string;
  lang: BuiltinLanguage;
};

export async function highlightWithShiki({
  code,
  lang,
}: HighlightWithShikiProps): Promise<string> {
  return codeToHtml(code, { lang, theme: "github-dark-dimmed" });
}

export type ShikiCodeProps = {
  children: string;
  lang: BuiltinLanguage;
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
  const code = `#include <stdio.h>\n
int main() {
    printf("loading...");
    return 0; 
}
`.trim();

  return (
    <div className="h-full bg-code p-4 text-xs">
      <pre className="text-primary-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}
