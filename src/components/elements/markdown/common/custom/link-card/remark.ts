/* eslint-disable no-param-reassign */
import type { Root } from "mdast";
import { Plugin } from "unified";
import { visit } from "unist-util-visit";

declare module "mdast" {
  export interface LinkCard extends Resource {
    type: "link-card";
  }

  interface RootContentMap {
    "link-card": LinkCard;
  }
}

export const remarkLinkCard: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, "paragraph", (node, index, parent) => {
      const link = node.children[0];

      if (node.children.length !== 1) return;
      if (link.type !== "link") return;
      if (link.children.length !== 1) return;

      const isPlainLink =
        link.children[0].type === "text" && link.url === link.children[0].value;
      if (!isPlainLink) return;

      if (!parent || index === undefined) return;

      parent.children[index] = {
        type: "link-card",
        url: link.url,
      };
    });
  };
};
