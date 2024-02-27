import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { isForceMountAtom } from "@/app/(edit)/components/[slug]/edit/_features/files/context";
import { useComponentFilesUpdater } from "@/app/(edit)/components/[slug]/edit/_features/files/hooks/upload";
import { getNewPreviewType } from "@/app/(edit)/components/[slug]/edit/_features/files/utils/change-type";
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
import { Params } from "@/types/next";

export function useFilesForm(defaultValues: EditFilesInput) {
  const { files } = useAtomValue(editValueStatesAtom);
  const { slug } = useParams<Params["params"]>();
  const prevFunctionName = useRef(defaultValues.previewType.functionName);
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
    resetField,
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
    prevFunctionName.current = data.previewType.functionName;
    setEditStatus((prev) => ({
      ...prev,
      files: { ...prev.files, dataStatus: "CREATED" },
    }));
    onNextSection("files");
  });

  const [status, setStatus] = useState<FilesStatus>(
    calcStatus(
      defaultValues.files,
      defaultValues.previewType.type,
      defaultValues.previewType.functionName
    )
  );

  const setFiles = (newFile: EditFilesInput["files"]) => {
    setValue("files", newFile, { shouldDirty: true, shouldValidate: true });

    const { type, functionName } = getValues("previewType");
    setStatus(calcStatus(newFile, type, functionName));
  };

  const setPreviewType = (type: "html" | "react") => {
    const values = getValues();

    const newPreviewType = getNewPreviewType({
      type,
      prevFunctionName: prevFunctionName.current,
    });

    const { files: filesValue } = values;

    resetField("previewType", {
      defaultValue: newPreviewType,
    });
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

    prevFunctionName.current = functionName;
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
