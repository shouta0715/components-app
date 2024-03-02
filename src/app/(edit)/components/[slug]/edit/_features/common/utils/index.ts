/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors } from "react-hook-form";

export const getHasErrorDuringSave = ({
  data,
  errors,
}: {
  data: Record<string, any>;
  errors: FieldErrors<Record<string, any>>;
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
