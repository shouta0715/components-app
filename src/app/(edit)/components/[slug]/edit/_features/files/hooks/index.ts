import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { isForceMountAtom } from "@/app/(edit)/components/[slug]/edit/_features/files/context";
import { isCapitalize } from "@/app/(edit)/components/[slug]/edit/_features/files/utils/capitalize";
import { calcStatus } from "@/app/(edit)/components/[slug]/edit/_features/files/utils/files-status";
import {
  editValueStatesAtom,
  isEditingAtom,
} from "@/app/(edit)/components/[slug]/edit/_features/section/contexts";

import {
  FilesStatus,
  invalidHtmlStatus,
  invalidReactStatus,
} from "@/app/(edit)/components/[slug]/edit/_features/section/types";
import {
  EditFilesInput,
  editFilesSchema,
} from "@/lib/schema/client/edit/files";
import { Params } from "@/types/next";

export function useFilesForm(defaultValues: EditFilesInput) {
  const { files } = useAtomValue(editValueStatesAtom);
  const setForceMount = useSetAtom(isForceMountAtom);
  const setIsEditing = useSetAtom(isEditingAtom);
  const { slug } = useParams<Params["params"]>();

  const {
    setValue,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    resetField,
    register,
    formState: { errors, isDirty, defaultValues: defaultValuesForm },
    control,
  } = useForm<EditFilesInput>({
    defaultValues: files || defaultValues,
    mode: "onSubmit",
    resolver: valibotResolver(editFilesSchema),
  });

  useEffect(() => {
    setIsEditing(isDirty);

    return () => setIsEditing(false);
  }, [isDirty, setIsEditing]);

  const onSubmitHandler = handleSubmit(async (data) => {
    // TODO: Implement onSubmitHandler
    console.log(data);
  });

  const [status, setStatus] = useState<FilesStatus>(
    defaultValues.previewType.type === "html"
      ? invalidHtmlStatus
      : invalidReactStatus
  );

  const setFiles = (newFile: EditFilesInput["files"]) => {
    setValue("files", newFile, { shouldDirty: true, shouldValidate: true });

    const { type, functionName } = getValues("previewType");
    setStatus(calcStatus(newFile, type, functionName));
  };

  const setPreviewType = (type: "html" | "react") => {
    clearErrors("files");
    setForceMount(true);
    const { files: filesValue } = getValues();

    const defaultFunctionName = defaultValuesForm?.previewType?.functionName;

    setValue("previewType.type", type);

    const newFunctionName =
      type === "html" ? null : defaultFunctionName || null;

    if (newFunctionName !== defaultFunctionName) {
      setValue("previewType.functionName", newFunctionName, {
        shouldDirty: true,
      });
    }

    setStatus(calcStatus(filesValue, type, newFunctionName));
  };

  const onCompleteFunctionName = (functionName: string) => {
    const validCapitalize = isCapitalize(functionName);

    if (!validCapitalize) {
      setError("previewType.functionName", {
        type: "manual",
        message: "関数名は大文字で始めてください。",
      });

      return;
    }
    const {
      files: filesValue,
      previewType: { type },
    } = getValues();

    setValue("previewType.functionName", functionName, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setStatus(calcStatus(filesValue, type, functionName));
    resetField("previewType.functionName", { defaultValue: functionName });
    setForceMount(true);
  };

  const isAllSuccess = useMemo(() => {
    return Object.values(status).every((s) => s.status === "success");
  }, [status]);

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
  };
}
