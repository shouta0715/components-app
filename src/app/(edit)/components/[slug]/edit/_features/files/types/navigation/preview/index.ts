import { DropzoneInputProps } from "react-dropzone";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

export type NavigationProps = {
  slug: string;
  files: EditFilesInput["files"];
  isLoading: boolean;
  isDragActive: boolean;
  functionName?: string;
  onDeleteFile: (id: string) => void;
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps;
};
