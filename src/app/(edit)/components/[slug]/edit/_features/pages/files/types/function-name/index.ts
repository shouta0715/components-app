import { Control, DeepPartial, FieldErrors } from "react-hook-form";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

export type FunctionNameInputProps = {
  control: Control<EditFilesInput>;
  defaultValues?: Readonly<DeepPartial<EditFilesInput>>;
  onCompleteFunctionName: (value: string) => void;
  errors: FieldErrors<EditFilesInput>;
};
