"use client";

import dynamic from "next/dynamic";
import React, { Suspense } from "react";

import {
  CategoryFormLoader,
  PreviewDropZoneLoader,
} from "@/app/(edit)/components/[slug]/edit/_components/client/loaders";
import { NextSectionButton } from "@/app/(edit)/components/[slug]/edit/_components/client/next-section-button";
import { useSummaryForm } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/form/summary";
import { EditSummaryInput } from "@/app/(edit)/components/[slug]/edit/_hooks/schema/summary";
import { ErrorMessage } from "@/components/ui/error-message";
import { InputLength } from "@/components/ui/input-length";
import { Label } from "@/components/ui/label";
import { AutoSizeTextarea, Textarea } from "@/components/ui/textarea";

type EditSummaryFormProps = {
  defaultValues: EditSummaryInput;
};

const DynamicCategoryForm = dynamic(
  () =>
    import(
      "@/app/(edit)/components/[slug]/edit/_components/client/form/summary/category-selector"
    ),
  {
    ssr: false,
    loading: () => <CategoryFormLoader />,
  }
);

const DynamicPreviewDropZone = dynamic(
  () =>
    import("@/app/(edit)/components/[slug]/edit/_components/client/drop-zones"),
  {
    ssr: false,
    loading: () => <PreviewDropZoneLoader />,
  }
);

export function EditSummaryForm({ defaultValues }: EditSummaryFormProps) {
  const {
    control,
    errors,
    isDirty,
    register,
    onDropAccepted,
    onDropRejected,
    handleSubmit,
    setValue,
  } = useSummaryForm(defaultValues);

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={handleSubmit((d) => {
        console.log(d);
      })}
    >
      {/* Category Input Form Server Components */}
      <Suspense fallback="loading">
        <fieldset>
          <Suspense fallback={<CategoryFormLoader />}>
            <DynamicCategoryForm
              control={control}
              setCategory={(value) => setValue("categoryName", value)}
            />
          </Suspense>
          <ErrorMessage className="mt-1">
            {errors.categoryName?.message}
          </ErrorMessage>
        </fieldset>
      </Suspense>

      {/* Name Input Form Client Components */}

      <fieldset className="grid gap-3">
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
            defaultValue={defaultValues.name}
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
      <fieldset className="grid gap-3">
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
          defaultValue={defaultValues.description ?? ""}
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
      <fieldset className="grid gap-3">
        <Label htmlFor="categoryId" required>
          Preview Image
        </Label>

        <Suspense fallback={<PreviewDropZoneLoader />}>
          <DynamicPreviewDropZone
            isError={errors.previewUrl?.value?.type === "min_length"}
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
          />
        </Suspense>
        {errors.previewUrl?.value?.message && (
          <ErrorMessage className="mt-1">
            {errors.previewUrl?.value?.message}
          </ErrorMessage>
        )}
      </fieldset>
      <NextSectionButton currentSection="summary" isDirty={isDirty} />
    </form>
  );
}
