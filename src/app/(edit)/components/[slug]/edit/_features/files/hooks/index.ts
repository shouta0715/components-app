import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { isForceMountAtom } from "@/app/(edit)/components/[slug]/edit/_features/files/context";
import { useComponentFilesUpdater } from "@/app/(edit)/components/[slug]/edit/_features/files/hooks/upload";
import { calcStatus } from "@/app/(edit)/components/[slug]/edit/_features/files/utils/files-status";
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
import { ComponentUpdateInput } from "@/lib/schema/server/component";
import { Params } from "@/types/next";

export function useFilesForm(defaultValues: EditFilesInput) {
  const { files } = useAtomValue(editValueStatesAtom);
  const { slug } = useParams<Params["params"]>();
  const isPendingAtom = useAtomValue(isPendingEditAtom);

  const setForceMount = useSetAtom(isForceMountAtom);
  const setIsEditing = useSetAtom(isEditingAtom);
  const { onNextSection } = useRedirectSectionHandler();
  const setEditStatus = useSetAtom(editStatusAtom);

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

  useEffect(() => {
    setIsEditing(isDirty);

    return () => setIsEditing(false);
  }, [isDirty, setIsEditing]);

  const onSubmitHandler = handleSubmit(async (data) => {
    await onSubmit(data);
    setEditStatus((prev) => ({
      ...prev,
      files: { ...prev.files, dataStatus: "CREATED" },
    }));
    onNextSection("files");
  });

  async function handleDuringSave({
    draft,
  }: Pick<ComponentUpdateInput, "draft">) {
    const data = getValues();
    const errorsFields = Object.keys(errors);
    const hasError = errorsFields.length > 0;

    if (!hasError) {
      await onSubmit(data, draft);

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

    await onSubmit(data, draft);
  }

  const [status, setStatus] = useState<FilesStatus>(
    calcStatus(
      defaultValues.files,
      defaultValues.previewType.type,
      defaultValues.previewType.functionName
    )
  );

  const onReset = () => {
    reset();

    const prevFiles: EditFilesInput["files"] =
      (defaultValuesForm?.files as EditFilesInput["files"]) ??
      defaultValues.files;

    setStatus(
      calcStatus(
        prevFiles,
        defaultValuesForm?.previewType?.type ?? defaultValues.previewType.type,
        defaultValuesForm?.previewType?.functionName ??
          defaultValues.previewType.functionName
      )
    );
    setForceMount(true);
  };

  const setFiles = (newFile: EditFilesInput["files"]) => {
    setValue("files", newFile, { shouldDirty: true, shouldValidate: true });

    const { type, functionName } = getValues("previewType");
    setStatus(calcStatus(newFile, type, functionName));
  };

  const setPreviewType = (type: "html" | "react") => {
    const values = getValues();

    const { files: filesValue } = values;

    const newPreviewType =
      type === "html"
        ? { type, functionName: null }
        : { type, functionName: defaultValues.previewType.functionName ?? "" };

    setValue("previewType", newPreviewType);
    setStatus(calcStatus(filesValue, type, newPreviewType.functionName));
    clearErrors("files");
    setForceMount(true);
  };

  const onCompleteFunctionName = (functionName: string) => {
    const {
      files: filesValue,
      previewType: { type },
    } = getValues();

    setValue("previewType.functionName", functionName, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setStatus(calcStatus(filesValue, type, functionName));
    setForceMount(true);
  };

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
    onReset,
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
