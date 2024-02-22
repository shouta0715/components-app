import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  editValueStatesAtom,
  isEditingAtom,
  isPendingEditAtom,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";

import { useUpdatePreview } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/form/summary/image";
import { useComponentUpdater } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/form/summary/update";
import { useRedirectSectionHandler } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/section";
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
    onNextSection("summary");
  });

  async function handleDuringSave(input?: ComponentUpdateInput) {
    const data = getValues();
    const hasError = Object.keys(errors).length > 0;

    if (hasError) {
      const errorsFields = Object.keys(errors);
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
