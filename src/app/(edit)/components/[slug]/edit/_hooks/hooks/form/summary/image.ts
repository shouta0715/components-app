import { useCallback } from "react";
import { FileRejection } from "react-dropzone";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";

type UseUpdatePreviewProps = {
  setError: UseFormSetError<EditSummaryInput>;
  clearErrors: UseFormClearErrors<EditSummaryInput>;
  setValue: UseFormSetValue<EditSummaryInput>;
  errors: FieldErrors<EditSummaryInput>;
};

export function useUpdatePreview({
  setError,
  clearErrors,
  setValue,
  errors,
}: UseUpdatePreviewProps) {
  const onDropAccepted = useCallback(
    (file: File) => {
      if (errors.previewUrl?.value) clearErrors("previewUrl.value");

      setValue(
        "previewUrl",
        { type: "input", value: file },
        { shouldDirty: true }
      );
    },
    [clearErrors, errors.previewUrl?.value, setValue]
  );

  const onDropRejected = useCallback(
    (files: FileRejection[]) => {
      let message = "";

      if (files.length > 1) {
        message = "アップロードできる写真は1枚だけです";
      } else {
        const extensions = files[0].file.name.split(".")[1].toUpperCase();

        message = `${extensions}形式はアップロードできません。PNG, JPG, GIF, WEBPのみアップロードできます`;
      }

      setError("previewUrl.value", {
        type: "manual",
        message,
      });
    },
    [setError]
  );

  return {
    onDropAccepted,
    onDropRejected,
  };
}
