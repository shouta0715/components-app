import { useSetAtom } from "jotai";
import { useCallback } from "react";
import {
  DeepPartial,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

import { isForceMountAtom } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/context";
import { calcStatus } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/utils/files-status";

import { FilesStatus } from "@/app/(edit)/components/[slug]/edit/_features/section/types";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

type UseFilesHandlerProps = {
  reset: () => void;
  setStatus: (status: FilesStatus) => void;
  getValues: UseFormGetValues<EditFilesInput>;
  clearErrors: UseFormClearErrors<EditFilesInput>;
  defaultValues: EditFilesInput;
  defaultValuesForm?: DeepPartial<EditFilesInput>;
  setValue: UseFormSetValue<EditFilesInput>;
};

export function useFilesHandler({
  defaultValues,
  defaultValuesForm,
  reset,
  setStatus,
  setValue,
  getValues,
  clearErrors,
}: UseFilesHandlerProps) {
  const setForceMount = useSetAtom(isForceMountAtom);

  const onReset = useCallback(() => {
    reset();

    const {
      files: filesValue,
      previewType: { type, functionName },
    } = defaultValues;

    const prevFiles: EditFilesInput["files"] =
      (defaultValuesForm?.files as EditFilesInput["files"]) ?? filesValue;

    const newType = defaultValuesForm?.previewType?.type ?? type;

    const newFunctionName =
      defaultValuesForm?.previewType?.functionName ?? functionName;

    setStatus(calcStatus(prevFiles, newType, newFunctionName));
    setForceMount(true);
  }, [
    defaultValues,
    defaultValuesForm?.files,
    defaultValuesForm?.previewType?.functionName,
    defaultValuesForm?.previewType?.type,
    reset,
    setForceMount,
    setStatus,
  ]);

  const setFiles = useCallback(
    (newFile: EditFilesInput["files"]) => {
      setValue("files", newFile, { shouldDirty: true, shouldValidate: true });

      const { type, functionName } = getValues("previewType");
      const newStatus = calcStatus(newFile, type, functionName);
      setStatus(newStatus);

      const allSuccess = Object.values(newStatus).every(
        (s) => s.status === "success"
      );

      if (allSuccess) setForceMount(true);
    },
    [getValues, setForceMount, setStatus, setValue]
  );

  const setPreviewType = useCallback(
    (type: "html" | "react") => {
      const values = getValues();

      const { files: filesValue } = values;

      const newPreviewType =
        type === "html"
          ? { type, functionName: null }
          : {
              type,
              functionName: defaultValues.previewType.functionName ?? "",
            };

      setValue("previewType", newPreviewType);
      setStatus(calcStatus(filesValue, type, newPreviewType.functionName));
      clearErrors("files");
      setForceMount(true);
    },
    [
      clearErrors,
      defaultValues.previewType.functionName,
      getValues,
      setForceMount,
      setStatus,
      setValue,
    ]
  );

  const onCompleteFunctionName = useCallback(
    (functionName: string) => {
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
    },
    [getValues, setForceMount, setStatus, setValue]
  );

  return {
    setFiles,
    setPreviewType,
    onCompleteFunctionName,
    onReset,
  };
}
