import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

  const onSubmitHandler = handleSubmit(async (data) => {
    await onSubmit(data);
    setEditStatus((prev) => ({
      ...prev,
      summary: { ...prev.summary, dataStatus: "CREATED" },
    }));
    onNextSection("summary");
  });

  async function handleDuringSave(input?: ComponentUpdateInput) {
    const data = getValues();
    const errorsFields = Object.keys(errors);
    const hasError = errorsFields.length > 0;

    if (!hasError) {
      await onSubmit(data, input);

      return;
    }

    const validKeys = Object.keys(data).filter(
      (key) => !errorsFields.includes(key)
    );

    if (validKeys.length === 0) {
      toast.error(
        `変更するには、${errorsFields.join(", ")} を入力してください。`
      );

      return;
    }

    await onSubmit(data, input);
  }

  function onReset() {
    reset();
    setPreviews({
      crop: undefined,
      preview: defaultPreviewUrl,
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
    onReset,
    setPreviews,
  };
}
