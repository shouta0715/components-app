import { CodeBundlerError } from "@/lib/errors";
import { BASE_HTML } from "@/modules/base";
import { Target, TransformedCode } from "@/modules/types";
import { isBadCombination } from "@/modules/utils";

function concatHtml({
  targets,
  html,
  cssList,
}: {
  targets: Target[];
  html: string;
  cssList: Target[];
}): string {
  const scriptList = targets.filter(
    (t) => t.extension === "js" || t.extension === "ts"
  );

  const css = cssList.reduce((acc, curr) => {
    return `${acc}${curr.target}`;
  }, "");

  const scripts = scriptList.reduce((acc, curr) => {
    return `${acc}${curr.target}`;
  }, "");

  let result = html.replace("</style>", `${css}</style>`);

  result = result.replace(
    "</body>",
    `<script type="module">${scripts}</script></body>`
  );

  return result;
}

function concatJsx({
  targets,
  cssList,
}: {
  targets: Target[];
  cssList: Target[];
}): string {
  const scriptList = targets.filter((t) => t.extension !== "css");

  const scripts = scriptList.reduce((acc, curr) => {
    return `${acc}${curr.target}`;
  }, "");

  const css = cssList.reduce((acc, curr) => {
    return `${acc}${curr.target}`;
  }, "");

  let result = BASE_HTML.replace("</style>", `${css}</style>`);

  result = result.replace("<<<REPLACE_SCRIPTS_HERE>>>", scripts);

  return result;
}

export function concatCodes(targets: Target[]): TransformedCode {
  const isBad = isBadCombination(targets);

  if (isBad) {
    throw new CodeBundlerError();
  }

  const html = targets.find((t) => t.extension === "html");
  const cssList = targets.filter((t) => t.extension === "css");

  if (html) {
    return {
      result: concatHtml({ targets, html: html.target, cssList }),
      extension: "html",
    };
  }

  const isJsx = targets.some((t) => t.extension === "jsx");

  return {
    result: concatJsx({ targets, cssList }),
    extension: isJsx ? "jsx" : "tsx",
  };
}
