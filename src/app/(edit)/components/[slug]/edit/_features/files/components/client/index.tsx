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
import { Skeleton } from "@/components/ui/skeleton";
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

const DynamicDuringComponentSave = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_features/common/components/client/during-save"
    ),
  {
    ssr: false,
    loading: () => (
      <div className="sticky top-[57px] z-20 -mx-4 -mt-8 flex h-12 flex-1 items-center justify-between border-b border-border  bg-background px-2.5 py-2 sm:-mx-6 md:px-4 lg:-mx-8">
        <Skeleton className="h-full w-36" />
        <div className="flex h-full w-full items-center justify-end gap-x-4">
          <Skeleton className="h-full w-28" />
          <Skeleton className="h-full w-24" />
        </div>
      </div>
    ),
  }
);

export function EditFileForm({
  defaultValues,
  draft,
}: {
  defaultValues: EditFilesInput;
  draft: boolean;
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
    handleDuringSave,
    setFiles,
    setError,
    setPreviewType,
    onSubmitHandler,
    onCompleteFunctionName,
    register,
    onReset,
  } = useFilesForm(defaultValues);

  return (
    <>
      <DynamicDuringComponentSave
        draft={draft}
        handleDuringSave={handleDuringSave}
        isDirty={isDirty}
        isPending={isPending}
        onReset={onReset}
      />
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
            control={control}
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
    </>
  );
}
