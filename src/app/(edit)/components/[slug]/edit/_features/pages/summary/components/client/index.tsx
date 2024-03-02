"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import {
  CategoryFormLoader,
  PreviewDropZoneLoader,
} from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/loaders";
import { useSummaryForm } from "@/app/(edit)/components/[slug]/edit/_features/pages/summary/hooks";
import { NextSectionButton } from "@/app/(edit)/components/[slug]/edit/_features/section/components/client/next-section-button";

import { ErrorMessage } from "@/components/ui/error-message";
import { InputLength } from "@/components/ui/input-length";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { AutoSizeTextarea, Textarea } from "@/components/ui/textarea";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";

type EditSummaryFormProps = {
  defaultValues: EditSummaryInput;
  draft: boolean;
};

const DynamicCategoryForm = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_features/common/components/client/categories"
    ),
  {
    ssr: false,
    loading: () => <CategoryFormLoader />,
  }
);

const DynamicPreviewDropZone = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_features/common/components/client/drop-zone/components/client/image-drop-zones"
    ),
  {
    ssr: false,
    loading: () => <PreviewDropZoneLoader />,
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

export function EditSummaryForm({
  defaultValues,
  draft,
}: EditSummaryFormProps) {
  const {
    control,
    errors,
    isDirty,
    isPending,
    defaultValuesForm,
    previews,
    defaultPreviewUrl,
    register,
    onDropAccepted,
    onDropRejected,
    onSubmitHandler,
    setValue,
    handleDuringSave,
    onReset,
    setPreviews,
  } = useSummaryForm(defaultValues);

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
        {/* Category Input Form Server Components */}
        <Suspense fallback="loading">
          <fieldset disabled={isPending}>
            <Suspense fallback={<CategoryFormLoader />}>
              <DynamicCategoryForm
                control={control}
                setCategory={(value) => {
                  setValue("categoryName", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }}
              />
            </Suspense>
            <ErrorMessage className="mt-1">
              {errors.categoryName?.message}
            </ErrorMessage>
          </fieldset>
        </Suspense>

        {/* Name Input Form Client Components */}

        <fieldset className="grid gap-3" disabled={isPending}>
          <Label htmlFor="name" required>
            Name
            <InputLength
              className="ml-2"
              control={control}
              maxLength={50}
              name="name"
            />
          </Label>

          <div className="mb-px border-b py-3 focus-within:mb-0 focus-within:border-b-2 focus-within:border-b-primary">
            <AutoSizeTextarea
              className="flex h-7 w-full resize-none items-center bg-background text-xl placeholder:text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={defaultValuesForm?.name}
              placeholder="Untitled Component"
              {...register("name")}
              maxRows={4}
              minRows={1}
            />
          </div>
          {errors.name?.message && (
            <ErrorMessage className="mt-1">{errors.name?.message}</ErrorMessage>
          )}
        </fieldset>

        {/* Description Input Form Client Components */}
        <fieldset className="grid gap-3" disabled={isPending}>
          <Label htmlFor="description">
            Description
            <InputLength
              className="mx-2"
              control={control}
              maxLength={200}
              name="description"
            />
          </Label>
          <Textarea
            className="min-h-32"
            defaultValue={defaultValuesForm?.description ?? ""}
            id="description"
            placeholder="description"
            {...register("description")}
          />
          {errors.description?.message && (
            <ErrorMessage className="mt-1">
              {errors.description?.message}
            </ErrorMessage>
          )}
        </fieldset>

        {/* Preview Image Input Form Client Components */}
        <fieldset className="grid gap-3" disabled={isPending}>
          <Label htmlFor="categoryId" required>
            Preview Image
          </Label>

          <Suspense fallback={<PreviewDropZoneLoader />}>
            <DynamicPreviewDropZone
              defaultValue={defaultPreviewUrl}
              isError={errors.previewUrl?.value?.type === "min_length"}
              isLoading={isPending}
              onDropAccepted={onDropAccepted}
              onDropRejected={onDropRejected}
              previews={previews}
              setPreviews={setPreviews}
            />
          </Suspense>
          {errors.previewUrl?.value?.message && (
            <ErrorMessage className="mt-1">
              {errors.previewUrl?.value?.message}
            </ErrorMessage>
          )}
        </fieldset>
        <NextSectionButton
          currentSection="summary"
          isDirty={isDirty}
          isLoading={isPending}
        />
      </form>
    </>
  );
}
