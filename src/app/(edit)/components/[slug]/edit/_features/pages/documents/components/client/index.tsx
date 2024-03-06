"use client";

import dynamic from "next/dynamic";
import React from "react";
import { DuringSaveLoader } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/loaders";
import { DocumentNavigation } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/components/client/navigation";
import { useDocumentForm } from "@/app/(edit)/components/[slug]/edit/_features/pages/documents/hooks";

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
    setValue,
    onSubmitHandler,
    handleDuringSave,
    reset,
    getValues,
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
      <form className="mt-8 space-y-8" onSubmit={onSubmitHandler}>
        <DocumentNavigation
          control={control}
          defaultValues={defaultValues}
          getValues={getValues}
          isDirty={isDirty}
          isPending={isPending}
          reset={reset}
          setValue={setValue}
        />
      </form>
    </>
  );
}
