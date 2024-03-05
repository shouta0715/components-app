/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldErrors } from "react-hook-form";
import { EditFilesInput, PreviewType } from "@/lib/schema/client/edit/files";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";
import { EditComp } from "@/types/prisma";

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

export const getEditDefaultValues = (data: EditComp) => {
  const {
    name,
    description,
    categoryName,
    previewUrl,
    functionName,
    document,
  } = data;

  const summaryDefaultValues: EditSummaryInput = {
    name,
    description,
    categoryName: categoryName === "other" ? "" : categoryName,
    previewUrl: {
      type: "default",
      value: previewUrl,
    },
  };

  const files: EditFilesInput["files"] = data.files.map((file) => ({
    id: file.id,
    type: "default",
    objectId: file.objectId,
    extension: file.extension,
    name: file.name,
  }));

  const previewType: PreviewType = functionName
    ? {
        type: "react",
        functionName,
      }
    : {
        type: "html",
        functionName: null,
      };

  const filesDefaultValues: EditFilesInput = {
    files,
    previewType,
  };

  return {
    files: filesDefaultValues,
    summary: summaryDefaultValues,
    document,
    draft: data.draft,
    name,
  };
};
