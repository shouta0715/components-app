import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue } from "jotai";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { editValueStatesAtom } from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";

import {
  FileStatus,
  FilesStatus,
  errorFilesStatus,
  successFilesStatus,
} from "@/app/(edit)/components/[slug]/edit/_hooks/types";
import {
  EditFilesInput,
  editFilesSchema,
} from "@/lib/schema/client/edit/files";
import { isBadCombination } from "@/scripts/ui-preview/utils";
import { Params } from "@/types/next";

function calcStatus(files: EditFilesInput["files"]): FilesStatus {
  if (files.length === 0) {
    return errorFilesStatus;
  }

  const exs = files.map((file) => file.extension);
  const isBad = isBadCombination(exs);

  const hasPreviewFile = files.find(
    (file) =>
      file.extension === "html" ||
      file.extension === "jsx" ||
      file.extension === "tsx"
  );
  const numbersStatus: FileStatus =
    files.length < 3
      ? successFilesStatus.numbers
      : {
          status: "error",
          message: "入力できるファイルの数は3つまでです。",
        };

  const previewStatus = hasPreviewFile
    ? successFilesStatus.preview
    : errorFilesStatus.preview;

  const combinationStatus = isBad
    ? errorFilesStatus.combination
    : successFilesStatus.combination;

  return {
    numbers: numbersStatus,
    preview: previewStatus,
    combination: combinationStatus,
  };
}

export function useFilesForm(defaultValues: EditFilesInput) {
  const { files } = useAtomValue(editValueStatesAtom);
  const { slug } = useParams<Params["params"]>();

  const {
    setValue,
    getValues,
    handleSubmit,
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

  const [status, setStatus] = useState<FilesStatus>(errorFilesStatus);

  const setFiles = (newFile: EditFilesInput["files"]) => {
    setValue("files", newFile);
    setStatus(calcStatus(newFile));
  };

  const isAllSuccess = useMemo(() => {
    return Object.values(status).every((s) => s.status === "success");
  }, [status]);

  return {
    setFiles,
    getValues,
    onSubmitHandler,
    errors,
    slug,
    control,
    defaultValuesForm,
    isDirty,
    status,
    isAllSuccess,
  };
}
