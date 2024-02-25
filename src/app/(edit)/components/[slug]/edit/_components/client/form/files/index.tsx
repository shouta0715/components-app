"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FunctionNameInput } from "@/app/(edit)/components/[slug]/edit/_components/client/form/files/function-name-input";
import { FilesStatus } from "@/app/(edit)/components/[slug]/edit/_components/client/form/files/status";
import { TogglePreviewType } from "@/app/(edit)/components/[slug]/edit/_components/client/form/files/toggel-preview-type";
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
  const {
    control,
    slug,
    isDirty,
    status,
    isAllSuccess,
    errors,
    defaultValuesForm,
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
        isLoading={false}
      />
    </form>
  );
}
