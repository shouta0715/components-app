import { Highlighter, getHighlighter } from "shiki/bundle/web";

let highlighter: Highlighter;

const langs = [
  // web languages
  "html",
  "css",
  "javascript",
  "js",
  "jsx",
  "typescript",
  "ts",
  "tsx",
  "json",
  "css",
  "markdown",
  "plaintext",
];
export const getShikiHighlighter = async () => {
  if (highlighter) return highlighter;

  highlighter = await getHighlighter({
    langs,
    themes: ["github-dark-dimmed"],
  });

  return highlighter;
};
