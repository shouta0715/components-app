import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue } from "jotai";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { getFilesStatus } from "@/app/(edit)/components/[slug]/edit/_features/files/utils/files-status";
import { editValueStatesAtom } from "@/app/(edit)/components/[slug]/edit/_features/section/contexts";

import {
  FilesStatus,
  invalidHtmlStatus,
  invalidReactStatus,
} from "@/app/(edit)/components/[slug]/edit/_features/section/types";
import {
  EditFilesInput,
  editFilesSchema,
} from "@/lib/schema/client/edit/files";
import { isBadCombination } from "@/scripts/ui-preview/utils";
import { Params } from "@/types/next";

function calcStatus(
  files: EditFilesInput["files"],
  type: "html" | "react",
  functionName?: string
): FilesStatus {
  const exs = files.map((file) => file.extension);
  const isBad = isBadCombination(exs);

  const hasPreviewFile = files.some((file) => {
    if (type === "html") {
      return file.extension === "html";
    }

    return file.extension === "tsx" || file.extension === "jsx";
  });

  return getFilesStatus({
    isBad,
    hasPreviewFile,
    type,
    functionName,
    length: files.length,
  });
}

export function useFilesForm(defaultValues: EditFilesInput) {
  const { files } = useAtomValue(editValueStatesAtom);
  const { slug } = useParams<Params["params"]>();

  const {
    setValue,
    getValues,
    setError,
    handleSubmit,
    resetField,
    register,
    formState: { errors, isDirty, defaultValues: defaultValuesForm },
    control,
  } = useForm<EditFilesInput>({
    defaultValues: files || defaultValues,
    mode: "onChange",
    resolver: valibotResolver(editFilesSchema),
  });

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
    setValue("files", newFile, { shouldDirty: true });

    const { type, functionName } = getValues("previewType");
    setStatus(calcStatus(newFile, type, functionName));
  };

  const setPreviewType = (type: "html" | "react") => {
    const {
      files: filesValue,
      previewType: { functionName },
    } = getValues();

    setValue("previewType.type", type);
    setStatus(calcStatus(filesValue, type, functionName));
  };

  const onCompleteFunctionName = (functionName: string) => {
    const {
      files: filesValue,
      previewType: { type },
    } = getValues();

    setValue("previewType.functionName", functionName);
    setStatus(calcStatus(filesValue, type, functionName));
    resetField("previewType.functionName", { defaultValue: functionName });
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
