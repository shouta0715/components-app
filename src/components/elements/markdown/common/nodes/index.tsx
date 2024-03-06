/* eslint-disable jsx-a11y/control-has-associated-label */
//  再帰的に呼び出されるため
/* eslint-disable @typescript-eslint/no-use-before-define   */
/* eslint-disable react/no-array-index-key */

import type { PhrasingContent, RootContentMap, RootContent } from "mdast";
import React from "react";
import { cn } from "@/utils";

const HeadingNode = ({ node }: { node: RootContentMap["heading"] }) => {
  const Component = (
    {
      1: "h1",
      2: "h2",
      3: "h3",
      4: "h4",
      5: "h5",
      6: "h6",
    } as const
  )[node.depth];

  const childrenText = (function getChildrenText(
    children: PhrasingContent[]
  ): string {
    return children.reduce((acc, child) => {
      if ("value" in child) {
        return acc + child.value;
      }
      if ("children" in child) {
        return acc + getChildrenText(child.children);
      }

      return acc;
    }, "");
  })(node.children);

  return (
    <Component
      className={cn(
        // h1 style
        Component === "h1" &&
          "scroll-m-20 text-2xl font-extrabold tracking-tight sm:text-3xl first:mt-0 mt-6",

        // h2 style
        Component === "h2" &&
          "scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight sm:text-2xl first:mt-0 mt-6",

        // h3 style
        Component === "h3" &&
          "scroll-m-20 text-lg font-semibold tracking-tight sm:text-xl first:mt-0 mt-6",

        // h4 style
        Component === "h4" &&
          "scroll-m-20 font-semibold tracking-tight text-base sm:text-lg"
      )}
      id={encodeURIComponent(childrenText)}
    >
      <NodesRenderer nodes={node.children} />
    </Component>
  );
};

const TextNode = ({ node }: { node: RootContentMap["text"] }) => {
  return node.value;
};

const ParagraphNode = ({ node }: { node: RootContentMap["paragraph"] }) => {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      <NodesRenderer nodes={node.children} />
    </p>
  );
};

const InlineCodeNode = ({ node }: { node: RootContentMap["inlineCode"] }) => {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {node.value}
    </code>
  );
};

const BlockQuoteNode = ({ node }: { node: RootContentMap["blockquote"] }) => {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">
      <NodesRenderer nodes={node.children} />
    </blockquote>
  );
};

const LinkNode = ({ node }: { node: RootContentMap["link"] }) => {
  return (
    <a
      className="underline underline-offset-4"
      href={node.url}
      rel="noreferrer"
      target="_blank"
    >
      <NodesRenderer nodes={node.children} />
    </a>
  );
};

const ListNode = ({ node }: { node: RootContentMap["list"] }) => {
  return node.ordered ? (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
      <NodesRenderer nodes={node.children} />
    </ol>
  ) : (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-0">
      <NodesRenderer nodes={node.children} />
    </ul>
  );
};

const ListItemNode = ({ node }: { node: RootContentMap["listItem"] }) => {
  if (node.children.length === 1 && node.children[0].type === "paragraph") {
    return (
      <li>
        <NodesRenderer nodes={node.children[0].children} />
      </li>
    );
  }

  return (
    <li>
      <NodesRenderer nodes={node.children} />
    </li>
  );
};

const StrongNode = ({ node }: { node: RootContentMap["strong"] }) => {
  return (
    <strong className="font-semibold">
      <NodesRenderer nodes={node.children} />
    </strong>
  );
};

const ImageNode = ({ node }: { node: RootContentMap["image"] }) => {
  return (
    <a href={node.url} rel="noreferrer" target="_blank">
      <img alt={node.alt ?? ""} src={node.url} />
    </a>
  );
};

const CodeNode = ({ node }: { node: RootContentMap["code"] }) => {
  // TODO: Syntax highlighting

  // const lang = node.lang ?? "";

  // const highlighted = await highlightWithShiki(node.value, lang);

  // return <div dangerouslySetInnerHTML={{ __html: highlighted }} />;

  return <code>{node.value}</code>;
};

const DeleteNode = ({ node }: { node: RootContentMap["delete"] }) => {
  return (
    <del>
      <NodesRenderer nodes={node.children} />
    </del>
  );
};

const TableNode = ({ node }: { node: RootContentMap["table"] }) => {
  const [headRow, ...bodyRows] = node.children;

  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
            {headRow.children.map((cell, index) => (
              <th
                key={index}
                className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
                style={{ textAlign: node.align?.[index] ?? undefined }}
              >
                <NodesRenderer nodes={cell.children} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, index) => (
            <tr key={index} className="m-0 border-t p-0 even:bg-muted">
              {row.children.map((cell, i) => (
                <td
                  key={i}
                  className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                  style={{ textAlign: node.align?.[i] ?? undefined }}
                >
                  <NodesRenderer nodes={cell.children} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ThematicBreakNode = () => {
  return <hr />;
};

const HTMLNode = ({ node }: { node: RootContentMap["html"] }) => {
  return node.value;
};

export const NodesRenderer = ({ nodes }: { nodes: RootContent[] }) => {
  return nodes.map((node, index) => {
    switch (node.type) {
      case "heading": {
        return <HeadingNode key={`${node.type}-${index}`} node={node} />;
      }
      case "text": {
        return <TextNode key={`${node.type}-${index}`} node={node} />;
      }
      case "paragraph": {
        return <ParagraphNode key={`${node.type}-${index}`} node={node} />;
      }
      case "inlineCode": {
        return <InlineCodeNode key={`${node.type}-${index}`} node={node} />;
      }
      case "blockquote": {
        return <BlockQuoteNode key={`${node.type}-${index}`} node={node} />;
      }
      case "link": {
        return <LinkNode key={`${node.type}-${index}`} node={node} />;
      }
      case "list": {
        return <ListNode key={`${node.type}-${index}`} node={node} />;
      }
      case "listItem": {
        return <ListItemNode key={`${node.type}-${index}`} node={node} />;
      }
      case "strong": {
        return <StrongNode key={`${node.type}-${index}`} node={node} />;
      }
      case "image": {
        return <ImageNode key={`${node.type}-${index}`} node={node} />;
      }
      case "code": {
        return <CodeNode key={`${node.type}-${index}`} node={node} />;
      }
      case "delete": {
        return <DeleteNode key={`${node.type}-${index}`} node={node} />;
      }
      case "table": {
        return <TableNode key={`${node.type}-${index}`} node={node} />;
      }
      case "thematicBreak": {
        return <ThematicBreakNode key={`${node.type}-${index}`} />;
      }
      case "html": {
        return <HTMLNode key={`${node.type}-${index}`} node={node} />;
      }

      default: {
        throw new Error(`Unknown node type: ${node.type}`);
      }
    }
  });
};
