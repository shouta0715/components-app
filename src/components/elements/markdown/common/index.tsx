import { cache, use } from "react";

import { NodesRenderer } from "@/components/elements/markdown/common/nodes";
import { parseMarkdown } from "@/components/elements/markdown/common/plugins";

const cacheParseMarkdown = cache(parseMarkdown);

export const Markdown = ({ children }: { children: string }) => {
  const mdastRoot = use(cacheParseMarkdown(children));

  return (
    <div className="markdown">
      <NodesRenderer nodes={mdastRoot.children} />
    </div>
  );
};
