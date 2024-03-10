import { DeepPartial } from "react-hook-form";
import { EditFilesInput } from "@/lib/schema/client/edit/files";
import { FilesUpdateInput } from "@/lib/schema/server/files";

type GetChangedFilesValuesProps = {
  input: FilesUpdateInput;
  defaultValues?: Readonly<DeepPartial<EditFilesInput>>;
  defaultDraft?: boolean;
};
export const getChangedFilesValues = ({
  input,
  defaultValues,
  defaultDraft,
}: GetChangedFilesValuesProps): FilesUpdateInput => {
  return Object.fromEntries(
    Object.entries(input).filter(([key, value]) => {
      const asKey = key as keyof FilesUpdateInput;

      if (asKey === "deleteFiles") {
        const isArr = Array.isArray(value);
        if (!isArr) return false;

        return value.length > 0;
      }

      if (asKey === "uploadFiles") {
        const isArr = Array.isArray(value);
        if (!isArr) return false;

        return value.length > 0;
      }

      if (asKey === "draft") {
        return value !== defaultDraft;
      }

      if (asKey === "functionName") {
        return value !== defaultValues?.previewType?.functionName;
      }

      return false;
    })
  );
};
