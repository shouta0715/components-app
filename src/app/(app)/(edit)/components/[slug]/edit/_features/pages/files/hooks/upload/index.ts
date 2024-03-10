import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { DeepPartial } from "react-hook-form";
import {
  FilesUploaderProps,
  useMutateFiles,
  useUploadFiles,
} from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/files/api/files";
import { getChangedFilesValues } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/files/utils/change-values";
import {
  convertFiles,
  getResetDefaultFiles,
} from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/files/utils/convert";
import { editValueStatesAtom } from "@/app/(app)/(edit)/components/[slug]/edit/_features/section/contexts";
import {
  EditFilesInput,
  editFilesSchema,
} from "@/lib/schema/client/edit/files";
import { FilesUpdateInput } from "@/lib/schema/server/files";
import { safeValidate } from "@/lib/validation";

type UseComponentFilesUpdaterProps = {
  defaultValues?: Readonly<DeepPartial<EditFilesInput>>;
  reset: (data: EditFilesInput) => void;
  slug: string;
};

type OnsubmitProps = {
  data: EditFilesInput;
  draft?: boolean;
};

export function useComponentFilesUpdater({
  defaultValues,
  reset,
  slug,
}: UseComponentFilesUpdaterProps) {
  const setAtomValues = useSetAtom(editValueStatesAtom);

  const { mutateAsync, isPending } = useMutateFiles(slug);
  const { isPending: isUploading, mutateAsync: onUploadFiles } =
    useUploadFiles();

  const onUpload = useCallback(
    async (data: FilesUploaderProps) => {
      if (!data.length) return [];

      const uploadedFiles = await onUploadFiles(data);

      return uploadedFiles.map((file) => ({
        objectId: file.objectId,
        extension: file.extension,
        name: file.name,
      }));
    },
    [onUploadFiles]
  );

  const onSubmit = useCallback(
    async ({ data, draft }: OnsubmitProps) => {
      const { files, previewType } = data;

      const { defaultTypeFiles, uploadData, deleteFiles } = convertFiles({
        files,
        defaultFiles: defaultValues?.files,
      });

      const uploadFiles = await onUpload(uploadData);

      const functionName =
        previewType.type === "react" ? previewType.functionName : undefined;

      const input: FilesUpdateInput = {
        functionName,
        draft,
        uploadFiles,
        deleteFiles,
      };

      const values = getChangedFilesValues({
        input,
        defaultValues,
        defaultDraft: draft,
      });

      const ids = await mutateAsync(values);

      const resetFiles = getResetDefaultFiles({
        uploadFiles,
        ids,
        defaultTypeFiles,
      });

      const newData: EditFilesInput = {
        ...data,
        files: resetFiles,
      };

      reset(newData);

      setAtomValues((prev) => ({
        ...prev,
        files: newData,
      }));

      const allCreated = safeValidate(data, editFilesSchema);

      return allCreated.success;
    },
    [defaultValues, mutateAsync, onUpload, reset, setAtomValues]
  );

  return {
    onSubmit,
    isPending: isPending || isUploading,
  };
}
