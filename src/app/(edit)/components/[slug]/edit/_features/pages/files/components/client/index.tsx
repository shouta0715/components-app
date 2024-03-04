"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DuringSaveLoader } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/loaders";
import { EditSectionTitle } from "@/app/(edit)/components/[slug]/edit/_features/common/components/server/title";
import { FunctionNameInput } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/components/client/function-name-input";
import { FileNavigationLoading } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/components/client/loading";
import { FilesStatus } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/components/client/status";
import { TogglePreviewType } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/components/client/toggle-preview-type";
import { useFilesForm } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/hooks";
import { NextSectionButton } from "@/app/(edit)/components/[slug]/edit/_features/section/components/client/next-section-button";
import { UIPreviewError } from "@/components/elements/files/ui-preview/client/error";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

const DynamicEditFilesNavigate = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_features/pages/files/components/client/navigation"
    ),
  {
    ssr: false,
    loading: () => <FileNavigationLoading />,
  }
);

const DynamicDuringComponentSave = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_features/common/components/client/during-save"
    ),
  {
    ssr: false,
    loading: () => <DuringSaveLoader />,
  }
);

type EditFileFormProps = {
  defaultValues: EditFilesInput;
  draft: boolean;
  name: string;
};

export function EditFileForm({
  defaultValues,
  draft,
  name,
}: EditFileFormProps) {
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
  } = useFilesForm(defaultValues);

  return (
    <>
      <DynamicDuringComponentSave
        draft={draft}
        handleDuringSave={handleDuringSave}
        isDirty={isDirty}
        isPending={isPending}
        name={name}
      />

      <EditSectionTitle>
        <span className="px-2 font-black">UI</span>のファイルの投稿
      </EditSectionTitle>

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
          <Suspense fallback={<UIPreviewLoading name="Loading" />}>
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
