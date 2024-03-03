"use client";

import { Check } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
import { DocumentNavigation } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/components/client/navigation";
import { useDocumentForm } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/hooks";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EditDocumentInput } from "@/lib/schema/client/edit/document";

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

type EdiDocumentFormProps = {
  defaultValues: EditDocumentInput;
  draft: boolean;
};

export function EditDocumentForm({
  defaultValues,
  draft,
}: EdiDocumentFormProps) {
  const {
    register,
    onSubmitHandler,
    handleDuringSave,
    isDirty,
    control,
    isPending,
  } = useDocumentForm(defaultValues);

  return (
    <>
      <DynamicDuringComponentSave
        draft={draft}
        handleDuringSave={handleDuringSave}
        isDirty={isDirty}
        isPending={isPending}
      />
      <form className="mt-8 flex flex-col gap-8" onSubmit={onSubmitHandler}>
        <DocumentNavigation
          control={control}
          defaultValues={defaultValues}
          register={register}
        />
        <Button
          className="ml-auto h-auto w-32 py-2 font-semibold transition-all"
          disabled={!isDirty || isPending}
          type="submit"
        >
          {isDirty ? (
            "変更を保存する"
          ) : (
            <span className="flex items-center">
              <Check className="mr-1 size-4" />
              保存済み
            </span>
          )}
        </Button>
      </form>
    </>
  );
}
