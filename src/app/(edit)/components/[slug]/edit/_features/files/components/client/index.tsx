"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FunctionNameInput } from "@/app/(edit)/components/[slug]/edit/_features/files/components/client/function-name-input";
import { FilesStatus } from "@/app/(edit)/components/[slug]/edit/_features/files/components/client/status";
import { TogglePreviewType } from "@/app/(edit)/components/[slug]/edit/_features/files/components/client/toggle-preview-type";
import { useFilesForm } from "@/app/(edit)/components/[slug]/edit/_features/files/hooks";
import { NextSectionButton } from "@/app/(edit)/components/[slug]/edit/_features/section/components/client/next-section-button";
import { UIPreviewError } from "@/components/elements/files/ui-preview/client/error";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

const DynamicEditFilesNavigate = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_features/files/components/client/navigation"
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
  const {
    control,
    slug,
    isDirty,
    status,
    isAllSuccess,
    errors,
    defaultValuesForm,
    isPending,
    setFiles,
    setError,
    setPreviewType,
    onSubmitHandler,
    onCompleteFunctionName,
    register,
  } = useFilesForm(defaultValues);

  return (
    <form className="mt-8 flex flex-col gap-8" onSubmit={onSubmitHandler}>
      <div className="flex flex-col justify-between gap-16 sm:flex-row">
        <FunctionNameInput
          control={control}
          defaultValues={defaultValuesForm}
          errors={errors}
          onCompleteFunctionName={onCompleteFunctionName}
          register={register}
        />
        <TogglePreviewType
          defaultType={defaultValuesForm?.previewType?.type}
          setPreviewType={setPreviewType}
        />
      </div>
      <ErrorBoundary FallbackComponent={UIPreviewError}>
        <Suspense fallback={<UIPreviewLoading name="edit" />}>
          <DynamicEditFilesNavigate
            controls={control}
            errors={errors}
            isAllSuccess={isAllSuccess}
            isLoading={false}
            setError={setError}
            setFiles={setFiles}
            slug={slug}
          />
        </Suspense>
      </ErrorBoundary>
      <FilesStatus status={status} />
      <NextSectionButton
        currentSection="files"
        isDirty={isDirty}
        isLoading={isPending}
      />
    </form>
  );
}
