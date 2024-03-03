import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { getHasErrorDuringSave } from "@/app/(edit)/components/[slug]/edit/_features/common/utils";
import { useFilesHandler } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/hooks/handler";
import { useComponentFilesUpdater } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/hooks/upload";
import { calcStatus } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/utils/files-status";
import {
  editStatusAtom,
  editValueStatesAtom,
  isEditingAtom,
  isPendingEditAtom,
} from "@/app/(edit)/components/[slug]/edit/_features/section/contexts";

import { useRedirectSectionHandler } from "@/app/(edit)/components/[slug]/edit/_features/section/hooks";
import { FilesStatus } from "@/app/(edit)/components/[slug]/edit/_features/section/types";
import {
  EditFilesInput,
  editFilesSchema,
} from "@/lib/schema/client/edit/files";
import { Params } from "@/types/next";

export function useFilesForm(defaultValues: EditFilesInput) {
  const { files } = useAtomValue(editValueStatesAtom);
  const { slug } = useParams<Params["params"]>();
  const isPendingAtom = useAtomValue(isPendingEditAtom);

  const setIsEditing = useSetAtom(isEditingAtom);
  const { onNextSection } = useRedirectSectionHandler();
  const setEditStatus = useSetAtom(editStatusAtom);

  const [status, setStatus] = useState<FilesStatus>(
    calcStatus(
      defaultValues.files,
      defaultValues.previewType.type,
      defaultValues.previewType.functionName
    )
  );

  const {
    setValue,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    reset,
    register,
    formState: { errors, isDirty, defaultValues: defaultValuesForm, isLoading },
    control,
  } = useForm<EditFilesInput>({
    defaultValues: files || defaultValues,
    mode: "onSubmit",
    resolver: valibotResolver(editFilesSchema),
  });

  const { onSubmit, isPending: isSubmitting } = useComponentFilesUpdater({
    defaultValues: defaultValuesForm,
    reset,
    slug,
  });

  const { setFiles, setPreviewType, onCompleteFunctionName } = useFilesHandler({
    reset,
    setStatus,
    setValue,
    getValues,
    clearErrors,
    defaultValues,
    defaultValuesForm,
  });

  useEffect(() => {
    setIsEditing(isDirty);

    return () => setIsEditing(false);
  }, [isDirty, setIsEditing]);

  // toast submit functions
  const toastOnSubmit = async (data: EditFilesInput) => {
    try {
      setEditStatus((prev) => ({
        ...prev,
        files: { ...prev.files, status: "LOADING" },
      }));
      await onSubmit({ data });
      setEditStatus((prev) => ({
        ...prev,
        files: { dataStatus: "CREATED", status: "EDITING" },
      }));
      onNextSection("files");
    } catch (e) {
      setEditStatus((prev) => ({
        ...prev,
        files: { ...prev.files, status: "EDITING" },
      }));

      throw e;
    }
  };

  const toastOnDuringSave = async ({ draft }: { draft?: boolean }) => {
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
        files: { ...prev.files, status: "LOADING" },
      }));

      const all = await onSubmit({ data, draft });

      setEditStatus((prev) => ({
        ...prev,
        files: {
          status: "EDITING",
          dataStatus: all ? "CREATED" : prev.files.dataStatus,
        },
      }));
    } catch (e) {
      setEditStatus((prev) => ({
        ...prev,
        files: { ...prev.files, status: "EDITING" },
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

  async function handleDuringSave({ draft }: { draft?: boolean }) {
    toast.promise(toastOnDuringSave({ draft }), {
      loading: "変更中...",
      success: "変更しました。",
      error: "変更できませんでした。",
    });
  }

  const isAllSuccess = useMemo(() => {
    return Object.values(status).every((s) => s.status === "success");
  }, [status]);

  const isPending = isPendingAtom || isSubmitting || isLoading;

  return {
    setFiles,
    getValues,
    onSubmitHandler,
    setError,
    setPreviewType,
    onCompleteFunctionName,
    register,
    handleDuringSave,
    errors,
    slug,
    control,
    defaultValuesForm,
    isDirty,
    status,
    isAllSuccess,
    isPending,
  };
}
