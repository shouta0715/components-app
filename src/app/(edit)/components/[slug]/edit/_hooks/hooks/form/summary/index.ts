import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { FileRejection } from "react-dropzone";
import { useForm } from "react-hook-form";
import {
  editStatusAtom,
  isPendingEditAtom,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import {
  useMutateImage,
  useMutateSummary,
} from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/query/summary";
import {
  EditSummaryInput,
  editSummarySchema,
} from "@/lib/schema/client/edit/summary";
import { ComponentUpdateInput } from "@/lib/schema/server/component";
import { Params } from "@/types/next";

export function useSummaryForm(defaultValues: EditSummaryInput) {
  const { slug } = useParams<Params["params"]>();
  const setEditStatus = useSetAtom(editStatusAtom);
  const isPendingAtom = useAtomValue(isPendingEditAtom);

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
    reset,
  } = useForm<EditSummaryInput>({
    defaultValues,
    mode: "onChange",
    resolver: valibotResolver(editSummarySchema),
  });

  const { mutateAsync, isPending: isMutating } = useMutateSummary(slug);
  const { mutateAsync: uploadImage, isPending: isUploading } = useMutateImage();

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

  const onSubmitHandler = handleSubmit(async (data) => {
    setEditStatus((prev) => ({
      ...prev,
      summary: { ...prev.summary, status: "LOADING" },
    }));

    let previewUrl: string;

    if (data.previewUrl.type !== "default") {
      const id = await uploadImage(data.previewUrl.value);
      previewUrl = id;
    } else {
      previewUrl = data.previewUrl.value;
    }

    const input: ComponentUpdateInput = {
      name: data.name,
      description: data.description,
      categoryName: data.categoryName,
      previewUrl,
    };

    const { success } = await mutateAsync({ ...input });

    if (!success) return;

    setEditStatus((prev) => ({
      ...prev,
      summary: { ...prev.summary, status: "EDITING" },
    }));

    reset({
      ...data,
      previewUrl: { type: "default", value: input.previewUrl },
    });
  });

  const isPending = isMutating || isLoading || isPendingAtom || isUploading;

  return {
    register,
    control,
    errors,
    onDropAccepted,
    onDropRejected,
    onSubmitHandler,
    trigger,
    setValue,
    watch,
    isDirty,
    isPending,
  };
}
