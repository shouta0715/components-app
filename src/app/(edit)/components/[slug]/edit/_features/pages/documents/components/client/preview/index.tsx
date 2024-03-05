import dynamic from "next/dynamic";
import React from "react";
import { Control, useWatch } from "react-hook-form";

import { FormEditDocumentInput } from "@/lib/schema/client/edit/document";

type DocumentPreviewProps = {
  control: Control<FormEditDocumentInput>;
};

const DynamicMarkdown = dynamic(
  () =>
    import("@/components/elements/markdown/client").then(
      (mod) => mod.ReactMarkdown
    ),
  {
    loading: () => <p>loading...</p>,
  }
);

export function DocumentPreview({ control }: DocumentPreviewProps) {
  const value = useWatch({
    control,
    name: "document",
  });

  return (
    <div className="max-w-full">
      {value ? (
        <DynamicMarkdown>{value}</DynamicMarkdown>
      ) : (
        <p>ドキュメントが入力されていません</p>
      )}
    </div>
  );
}
