import React from "react";
import { EditSummaryForm } from "@/app/(edit)/components/[slug]/edit/_features/pages/summary/components/client";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";

type EditSummaryProps = {
  defaultValues: EditSummaryInput;
  draft: boolean;
};

export function EditSummary({ defaultValues, draft }: EditSummaryProps) {
  return (
    <div>
      <EditSummaryForm defaultValues={defaultValues} draft={draft} />
    </div>
  );
}
