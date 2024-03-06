import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { getHasErrorDuringSave } from "@/app/(edit)/components/[slug]/edit/_features/common/utils";
import { useUpdatePreview } from "@/app/(edit)/components/[slug]/edit/_features/pages/summary/hooks/image";
import { useComponentUpdater } from "@/app/(edit)/components/[slug]/edit/_features/pages/summary/hooks/update";
import {
  editStatusAtom,
  editValueStatesAtom,
  isEditingAtom,
  isPendingEditAtom,
} from "@/app/(edit)/components/[slug]/edit/_features/section/contexts";
import { useRedirectSectionHandler } from "@/app/(edit)/components/[slug]/edit/_features/section/hooks";
import {
  EditSummaryInput,
  editSummarySchema,
} from "@/lib/schema/client/edit/summary";
import { ComponentUpdateInput } from "@/lib/schema/server/component";

export function useSummaryForm(defaultValues: EditSummaryInput) {
  const { summary } = useAtomValue(editValueStatesAtom);
  const { onNextSection } = useRedirectSectionHandler();

  const setIsEditing = useSetAtom(isEditingAtom);
  const isPendingAtom = useAtomValue(isPendingEditAtom);
  const setEditStatus = useSetAtom(editStatusAtom);

  const {
    register,
    control,
    setValue,
    formState: { errors, isDirty, isLoading, defaultValues: defaultValuesForm },
    setError,
    clearErrors,
    trigger,
    handleSubmit,
    watch,
    reset,
    getValues,
  } = useForm<EditSummaryInput>({
    defaultValues: summary || defaultValues,
    mode: "onChange",
    resolver: valibotResolver(editSummarySchema),
  });

  useEffect(() => {
    setIsEditing(isDirty);

    return () => setIsEditing(false);
  }, [isDirty, setIsEditing]);

  const defaultPreviewUrl =
    defaultValuesForm?.previewUrl?.type === "default"
      ? defaultValuesForm?.previewUrl.value
      : "";

  const { onDropAccepted, onDropRejected, previews, setPreviews } =
    useUpdatePreview({
      setError,
      clearErrors,
      setValue,
      errors,
      defaultValue: defaultPreviewUrl,
    });

  const { onSubmit, isMutating, isUploading } = useComponentUpdater({
    defaultValues: defaultValuesForm,
    reset,
  });

  // toast submit functions
  const toastOnSubmit = async (data: EditSummaryInput) => {
    try {
      setEditStatus((prev) => ({
        ...prev,
        summary: { ...prev.summary, status: "LOADING" },
      }));
      await onSubmit({ data });
      setEditStatus((prev) => ({
        ...prev,
        summary: { dataStatus: "CREATED", status: "EDITING" },
      }));
      onNextSection("summary");
    } catch (e) {
      setEditStatus((prev) => ({
        ...prev,
        summary: { ...prev.summary, status: "EDITING" },
      }));

      throw e;
    }
  };

  const toastOnDuringSave = async (input?: ComponentUpdateInput) => {
    const data = getValues();
    const { error, fields } = getHasErrorDuringSave({ data, errors });

    if (error) {
      const e = new Error(
        `変更するには、${fields.join(", ")} を入力してください。`
      );

      throw e;
    }

    try {
      setEditStatus((prev) => ({
        ...prev,
        summary: { ...prev.summary, status: "LOADING" },
      }));

      const all = await onSubmit({ data, updateInput: input });

      setEditStatus((prev) => ({
        ...prev,
        summary: {
          status: "EDITING",
          dataStatus: all ? "CREATED" : prev.summary.dataStatus,
        },
      }));
    } catch (e) {
      setEditStatus((prev) => ({
        ...prev,
        summary: { ...prev.summary, status: "EDITING" },
      }));

      throw e;
    }
  };

  // submit functions
  const onSubmitHandler = handleSubmit(async (data) => {
    toast.promise(toastOnSubmit(data), {
      loading: "変更中...",
      success: "変更しました。",
      error: "変更できませんでした。",
    });
  });

  async function handleDuringSave(input?: ComponentUpdateInput) {
    toast.promise(toastOnDuringSave(input), {
      loading: "変更中...",
      success: "変更しました。",
      error: (e) => e.message,
    });
  }

  const isPending = isMutating || isLoading || isPendingAtom || isUploading;

  return {
    control,
    errors,
    isDirty,
    isPending,
    defaultValuesForm,
    defaultPreviewUrl,
    previews,
    onDropAccepted,
    onDropRejected,
    onSubmitHandler,
    trigger,
    setValue,
    watch,
    register,
    handleDuringSave,
    setPreviews,
  };
}
