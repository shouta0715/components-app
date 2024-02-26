import { FileObject } from "@/services/files/get";

export type FilePreviewsProps = {
  slug: string;
  objects: FileObject[];
  functionName?: string;
};
