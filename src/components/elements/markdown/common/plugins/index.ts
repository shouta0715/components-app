import { remark } from "remark";
import remarkGfm from "remark-gfm";
import { remarkLinkCard } from "@/components/elements/markdown/common/custom/link-card/remark";

const remarks = remark().use(remarkLinkCard).use(remarkGfm);

type Root = ReturnType<typeof remarks.parse>;

export const parseMarkdown = async (markdown: string) => {
  const parsed = remarks.parse(markdown);

  const mdastRoot = (await remarks.run(parsed)) as Root;

  return mdastRoot;
};
