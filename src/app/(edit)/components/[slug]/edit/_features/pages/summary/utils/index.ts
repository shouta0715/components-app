import { FieldErrors } from "react-hook-form";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";

export const getHasErrorDuringSave = ({
  data,
  errors,
}: {
  data: EditSummaryInput;
  errors: FieldErrors<EditSummaryInput>;
}): {
  error: boolean;
  fields: string[];
} => {
  const errorsFields = Object.keys(errors);

  const validKeys = Object.keys(data).filter(
    (key) => !errorsFields.includes(key)
  );
  const hasError = validKeys.length === 0 || errorsFields.length > 0;

  return {
    error: hasError,
    fields: errorsFields,
  };
};
