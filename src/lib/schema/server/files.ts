import { Extension } from "@prisma/client";
import {
  Input,
  array,
  boolean,
  enum_,
  number,
  object,
  optional,
  string,
} from "valibot";
import { functionNameSchema } from "@/lib/schema/client/edit/files";
import { isRequiredOneField } from "@/lib/schema/server/custom";

const uploadFileSchema = object({
  name: string(),
  objectId: string(),
  extension: enum_(Extension),
});

export type UploadFileInput = Input<typeof uploadFileSchema>;

const deleteFiles = object({
  id: number(),
  objectId: string(),
  extension: enum_(Extension),
});

export type DeleteFilesInput = Input<typeof deleteFiles>;

export const filesUpdateSchema = object(
  {
    deleteFiles: optional(array(deleteFiles)),
    uploadFiles: optional(array(uploadFileSchema)),
    functionName: optional(functionNameSchema),
    draft: optional(boolean()),
  },
  [isRequiredOneField()]
);

export type FilesUpdateInput = Input<typeof filesUpdateSchema>;
