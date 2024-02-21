import { Extension } from "@prisma/client";
import {
  array,
  enum_,
  Input,
  minLength,
  object,
  string,
  toTrimmed,
  url,
} from "valibot";

export const editFileSchema = object({
  name: string([toTrimmed(), minLength(1, "1文字以上入力してください。")]),
  extension: enum_(Extension),
  objectId: string([toTrimmed(), url()]),
});

export type EditFileInput = Input<typeof editFileSchema>;

export const editFilesSchema = object({
  contents: array(editFileSchema),
});

export type EditFilesInput = Input<typeof editFilesSchema>;
