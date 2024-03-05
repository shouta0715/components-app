import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Control, useWatch } from "react-hook-form";

import { DocumentLoader } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/components/client/loader";
import { Button } from "@/components/ui/button";
import { FormEditDocumentInput } from "@/lib/schema/client/edit/document";

type DocumentPreviewProps = {
  control: Control<FormEditDocumentInput>;
};

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <div className="text-center">
        <span className="font-semibold text-destructive">
          Preview Loading Error
        </span>
        <p className="mt-6 text-xl font-semibold">
          プレビューの読み込み中にエラーが発生しました。
        </p>
      </div>
      <Button
        className="mt-4 font-semibold"
        onClick={resetErrorBoundary}
        type="button"
        variant="default"
      >
        再度読み込む
      </Button>
    </div>
  );
};

const DynamicMarkdown = dynamic(
  () =>
    import("@/components/elements/markdown/client").then(
      (mod) => mod.ReactMarkdown
    ),
  {
    loading: () => <DocumentLoader>プレビューを準備中...</DocumentLoader>,
  }
);

export function DocumentPreview({ control }: DocumentPreviewProps) {
  const value = useWatch({
    control,
    name: "document",
  });

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense
        fallback={<DocumentLoader>プレビューを準備中...</DocumentLoader>}
      >
        {value ? (
          <DynamicMarkdown>{value}</DynamicMarkdown>
        ) : (
          <p className="mt-4 text-center font-semibold">
            ドキュメントが入力されていません
          </p>
        )}
      </Suspense>
    </ErrorBoundary>
  );
}
