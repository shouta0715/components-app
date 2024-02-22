import { Extension } from "@prisma/client";
import {
  array,
  blob,
  enum_,
  Input,
  literal,
  maxSize,
  object,
  string,
  variant,
} from "valibot";

export const editFileSchema = variant("type", [
  object({
    type: literal("input"),
    // 1mb
    value: blob("ファイルを選択してください。", [
      maxSize(1024 * 1024, "ファイルのサイズは1MBまでです。"),
    ]),
  }),
  object({
    type: literal("default"),
    objectId: string(),
    extension: enum_(Extension),
  }),
]);

export type EditFileInput = Input<typeof editFileSchema>;

export const editFilesSchema = object({
  contents: array(editFileSchema),
});

export type EditFilesInput = Input<typeof editFilesSchema>;
