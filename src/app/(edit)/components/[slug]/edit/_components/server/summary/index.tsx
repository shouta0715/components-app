import React from "react";
import { EditSummaryForm } from "@/app/(edit)/components/[slug]/edit/_components/client/form/summary";
import { EditSummaryInput } from "@/app/(edit)/components/[slug]/edit/_hooks/schema/summary";

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
