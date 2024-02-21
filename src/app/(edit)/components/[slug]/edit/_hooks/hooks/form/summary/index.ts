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
import {
  EditSummaryInput,
  editSummarySchema,
} from "@/lib/schema/client/edit/summary";
import { ComponentUpdateInput } from "@/lib/schema/server/component";

export function useSummaryForm(defaultValues: EditSummaryInput) {
  const { summary } = useAtomValue(editValueStatesAtom);

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

  const { onDropAccepted, onDropRejected } = useUpdatePreview({
    setError,
    clearErrors,
    setValue,
    errors,
  });

  const { onSubmit, isMutating, isUploading } = useComponentUpdater({
    defaultValues,
    reset,
  });

  const onSubmitHandler = handleSubmit(async (data) => {
    await onSubmit(data);
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
    handleDuringSave,
    defaultValuesForm,
  };
}
