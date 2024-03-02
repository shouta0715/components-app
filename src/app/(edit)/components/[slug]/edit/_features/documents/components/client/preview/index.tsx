import React from "react";
import { Control, useWatch } from "react-hook-form";

import { ReactMarkdown } from "@/components/elements/markdown/client";
import { FormEditDocumentInput } from "@/lib/schema/client/edit/document";

type DocumentPreviewProps = {
  control: Control<FormEditDocumentInput>;
};

export function DocumentPreview({ control }: DocumentPreviewProps) {
  const value = useWatch({
    control,
    name: "document",
  });

  return (
    <div className="min-h-[50dvh]">
      {value ? (
        <ReactMarkdown>{value}</ReactMarkdown>
      ) : (
        <p>ドキュメントが入力されていません</p>
      )}
    </div>
  );
}
