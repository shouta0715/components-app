"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import {
  CategoryFormLoader,
  DuringSaveLoader,
  PreviewDropZoneLoader,
} from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/loaders";
import { EditSectionTitle } from "@/app/(edit)/components/[slug]/edit/_features/common/components/server/title";
import { useSummaryForm } from "@/app/(edit)/components/[slug]/edit/_features/pages/summary/hooks";
import { NextSectionButton } from "@/app/(edit)/components/[slug]/edit/_features/section/components/client/next-section-button";

import { ErrorMessage } from "@/components/ui/error-message";
import { InputLength } from "@/components/ui/input-length";
import { Label } from "@/components/ui/label";
import { AutoSizeTextarea, Textarea } from "@/components/ui/textarea";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";

type EditSummaryFormProps = {
  defaultValues: EditSummaryInput;
  name: string;
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
    loading: () => <DuringSaveLoader />,
  }
);

export function EditSummaryForm({ defaultValues, name }: EditSummaryFormProps) {
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
    setPreviews,
  } = useSummaryForm(defaultValues);

  return (
    <>
      <DynamicDuringComponentSave
        handleDuringSave={handleDuringSave}
        isDirty={isDirty}
        isPending={isPending}
        name={name}
      />

      <EditSectionTitle className="flex-1">
        <span className="px-1 font-black">UI</span>に関する情報の入力
      </EditSectionTitle>

      <form className="mt-8 space-y-8" onSubmit={onSubmitHandler}>
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

        <fieldset className="space-y-3" disabled={isPending}>
          <Label htmlFor="name" required>
            UIの名前
            <InputLength
              className="ml-2"
              control={control}
              maxLength={50}
              name="name"
            />
          </Label>

          <div className="h-10 border-b border-border py-2 focus-within:border-primary">
            <AutoSizeTextarea
              className="flex w-full resize-none items-center bg-transparent placeholder:pt-0.5 placeholder:text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue={defaultValuesForm?.name}
              placeholder="名前を入力..."
              {...register("name")}
              id="name"
              maxRows={4}
              minRows={1}
            />
          </div>
          {errors.name?.message && (
            <ErrorMessage className="mt-1">{errors.name?.message}</ErrorMessage>
          )}
        </fieldset>

        {/* Description Input Form Client Components */}
        <fieldset className="space-y-3" disabled={isPending}>
          <Label htmlFor="description">
            UIの説明
            <InputLength
              className="mx-2"
              control={control}
              maxLength={200}
              name="description"
            />
          </Label>
          <p className="text-xs text-muted-foreground">
            UIについての説明を入力してください。
          </p>
          <Textarea
            className="min-h-32 border-border bg-transparent placeholder:pt-0.5 placeholder:text-sm placeholder:text-muted-foreground"
            defaultValue={defaultValuesForm?.description ?? ""}
            id="description"
            placeholder="説明を入力..."
            {...register("description")}
          />
          {errors.description?.message && (
            <ErrorMessage className="mt-1">
              {errors.description?.message}
            </ErrorMessage>
          )}
        </fieldset>

        {/* Preview Image Input Form Client Components */}
        <fieldset className="space-y-3" disabled={isPending}>
          <Label htmlFor="categoryId" required>
            UIのプレビュー画像
          </Label>
          <p className="text-xs text-muted-foreground">
            一覧表示される際に表示する画像をアップロードしてください。
          </p>

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
