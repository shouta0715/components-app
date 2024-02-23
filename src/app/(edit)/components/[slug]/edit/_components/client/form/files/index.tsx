"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { NextSectionButton } from "@/app/(edit)/components/[slug]/edit/_components/client/next-section-button";
import { useFilesForm } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/form/files";
import { UIPreviewError } from "@/components/elements/files/ui-preview/client/error";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

const DynamicEditFilesNavigate = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_components/client/form/files/navigation"
    ),
  {
    ssr: false,
    loading: () => <UIPreviewLoading name="edit" />,
  }
);

export function EditFileForm({
  defaultValues,
}: {
  defaultValues: EditFilesInput;
}) {
  const { onSubmitHandler, control, slug, isDirty, setValue } =
    useFilesForm(defaultValues);

  return (
    <form className="mt-8 flex flex-col gap-8" onSubmit={onSubmitHandler}>
      <ErrorBoundary FallbackComponent={UIPreviewError}>
        <Suspense fallback={<UIPreviewLoading name="edit" />}>
          <DynamicEditFilesNavigate
            controls={control}
            isLoading={false}
            setValue={setValue}
            slug={slug}
          />
        </Suspense>
      </ErrorBoundary>

      <NextSectionButton
        currentSection="files"
        isDirty={isDirty}
        isLoading={false}
      />
    </form>
  );
}
