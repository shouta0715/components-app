import { valibotResolver } from "@hookform/resolvers/valibot";
import { useCallback } from "react";
import { FileRejection } from "react-dropzone";
import { useForm } from "react-hook-form";
import {
  EditSummaryInput,
  editSummarySchema,
} from "@/lib/schema/client/edit/summary";

export function useSummaryForm(defaultValues: EditSummaryInput) {
  const {
    register,
    control,
    setValue,
    formState: { errors, isDirty, isLoading },
    setError,
    clearErrors,
    trigger,
    handleSubmit,
    watch,
  } = useForm<EditSummaryInput>({
    defaultValues,
    mode: "onChange",
    resolver: valibotResolver(editSummarySchema),
  });

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
    register,
    control,
    errors,
    onDropAccepted,
    onDropRejected,
    handleSubmit,
    trigger,
    setValue,
    watch,
    isDirty,
    isLoading,
  };
}
