import React from "react";
import { EditSummaryForm } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/summary/components/client";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";

type EditSummaryProps = {
  defaultValues: EditSummaryInput;
  draft: boolean;
  name: string;
};

export function EditSummary(props: EditSummaryProps) {
  return (
    <div>
      <EditSummaryForm {...props} />
    </div>
  );
}
