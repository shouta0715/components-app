"use client";

import { Check } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
import { DuringSaveLoader } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/loaders";
import { DocumentNavigation } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/components/client/navigation";
import { useDocumentForm } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/hooks";

import { Button } from "@/components/ui/button";
import { EditDocumentInput } from "@/lib/schema/client/edit/document";

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

type EdiDocumentFormProps = {
  defaultValues: EditDocumentInput;
  draft: boolean;
  name: string;
};

export function EditDocumentForm({
  defaultValues,
  draft,
  name,
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
        name={name}
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
