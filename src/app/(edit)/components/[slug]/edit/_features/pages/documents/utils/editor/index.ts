import {
  defaultKeymap,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { HighlightStyle } from "@codemirror/language";
import { EditorView, keymap } from "@codemirror/view";
import { tags } from "@lezer/highlight";

export const onBold = (view: EditorView) => {
  const { from, to } = view.state.selection.main;
  const isStartBold =
    view.state.sliceDoc(from, from + 2) === "**" &&
    view.state.sliceDoc(to - 2, to) === "**";

  if (isStartBold) {
    const transaction = view.state.update({
      changes: {
        from,
        to,
        insert: view.state.sliceDoc(from + 2, to - 2),
      },
    });
    view.dispatch(transaction);

    return true;
  }

  const transaction = view.state.update({
    changes: {
      from,
      to,
      insert: `**${view.state.sliceDoc(from, to)}**`,
    },
  });

  view.dispatch(transaction);

  return true;
};

export const highlightStyle = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "var(--primary)",
  },

  {
    tag: tags.heading2,
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "var(--primary)",
    borderBottom: "1px solid var(--border)",
  },
  {
    tag: tags.heading3,
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "var(--primary)",
  },
  {
    tag: tags.heading4,
    fontSize: "1rem",
    fontWeight: "600",
    color: "var(--primary)",
  },

  { tag: tags.strong, fontWeight: "700" },
  { tag: tags.quote, fontStyle: "italic", color: "var(--primary)" },
  { tag: tags.link, textDecoration: "underline", color: "var(--primary)" },
  { tag: tags.emphasis, fontStyle: "italic" },
]);

export const customKeyMap = keymap.of([
  { key: "Mod-b", run: onBold },
  indentWithTab,
  ...historyKeymap,
  ...defaultKeymap,
]);
export const customTheme = {
  "&": {
    color: "var(--primary)",
    backgroundColor: "var(--background)",
    fontFamily: "var(--font-sans) !important",
  },
  ".cm-cursor": {
    borderLeftColor: "red !important",
  },
  "&.cm-editor": {
    outline: "none",
  },
  "&.cm-editor .cm-scroller": {
    fontFamily: "var(--font-sans) !important",
    lineHeight: "1.25rem",
  },
};
