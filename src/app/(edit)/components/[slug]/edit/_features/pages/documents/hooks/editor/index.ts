import { history } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { syntaxHighlighting } from "@codemirror/language";
import { EditorState, StateEffect } from "@codemirror/state";
import { EditorView, placeholder } from "@codemirror/view";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useRef } from "react";

import {
  UseFormGetValues,
  UseFormReset,
  UseFormSetValue,
} from "react-hook-form";
import {
  customKeyMap,
  customTheme,
  highlightStyle,
} from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/utils/editor";
import {
  EditDocumentInput,
  FormEditDocumentInput,
} from "@/lib/schema/client/edit/document";

type UseMarkdownEditorProps = {
  defaultValues: EditDocumentInput;
  getValues: UseFormGetValues<FormEditDocumentInput>;
  setValue: UseFormSetValue<FormEditDocumentInput>;
  reset: UseFormReset<FormEditDocumentInput>;
};

export function useMarkdownEditor({
  defaultValues,
  getValues,
  setValue,
  reset,
}: UseMarkdownEditorProps) {
  const { resolvedTheme } = useTheme();

  const container = useRef<HTMLDivElement>(null);
  const view = useRef<EditorView>();

  const updateListener = useMemo(() => {
    return EditorView.updateListener.of((update) => {
      if (!update.docChanged) return;

      const isDefault = update.state.doc.toString() === defaultValues;
      if (isDefault) {
        reset({ document: defaultValues });

        return;
      }
      const input = update.state.doc.toString();
      setValue("document", input, { shouldDirty: true });
    });
  }, [defaultValues, reset, setValue]);

  const themes = useMemo(() => {
    const isDark = resolvedTheme === "dark";

    return EditorView.theme(customTheme, {
      dark: isDark,
    });
  }, [resolvedTheme]);

  const extensions = useMemo(() => {
    return [
      updateListener,
      customKeyMap,
      themes,
      syntaxHighlighting(highlightStyle),
      EditorView.lineWrapping,
      history(),
      markdown({
        base: markdownLanguage,
      }),
      placeholder("ドキュメントを入力してください"),
    ];
  }, [themes, updateListener]);

  useEffect(() => {
    if (!container.current) return () => {};
    if (view.current) return view.current.destroy;

    const state = EditorState.create({
      doc: getValues("document") ?? defaultValues,
      extensions,
    });

    view.current = new EditorView({
      state,
      parent: container.current,
    });

    return () => {
      view.current?.destroy();
      view.current = undefined;
    };
  }, [defaultValues, extensions, getValues]);

  useEffect(() => {
    if (!view.current) return;
    view.current.dispatch({
      effects: StateEffect.reconfigure.of(extensions),
    });
  }, [view, extensions]);

  return {
    container,
  };
}
