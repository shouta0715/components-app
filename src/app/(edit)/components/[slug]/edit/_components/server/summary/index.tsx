import React from "react";
import { EditSummaryForm } from "@/app/(edit)/components/[slug]/edit/_components/client/form/summary";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";

type EditSummaryProps = {
  defaultValues: EditSummaryInput;
};

export function EditSummary({ defaultValues }: EditSummaryProps) {
  return (
    <div>
      <EditSummaryForm defaultValues={defaultValues} />
    </div>
  );
}
