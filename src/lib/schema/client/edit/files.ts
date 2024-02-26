import { Extension } from "@prisma/client";
import { extension } from "mime-types";
import {
  array,
  blob,
  custom,
  enum_,
  Input,
  literal,
  maxLength,
  maxSize,
  minLength,
  null_,
  object,
  string,
  variant,
} from "valibot";
import { safeValidate } from "@/lib/validation";
import { isBadCombination } from "@/scripts/ui-preview/utils";
import { extensions } from "@/types/file";

function extensionValidation(input: Blob): boolean {
  const validated = safeValidate(extension(input.type), extensions);

  return validated.success;
}

function customArrayValidation(input: EditFileInput[]): boolean {
  const exs = input.map((i) => i.extension);

  if (exs.length === 0) return false;

  if (isBadCombination(exs)) return false;

  const mainFile = input.find(
    (i) =>
      i.extension === "tsx" || i.extension === "jsx" || i.extension === "html"
  );

  if (!mainFile) return false;

  return true;
}

const inputFileSchema = object({
  type: literal("input"),
  // 1mb
  value: blob("ファイルを選択してください。", [
    maxSize(1024 * 1024, "ファイルのサイズは1MBまでです。"),
    custom(extensionValidation, "拡張子は、html,css,js,jsx,ts,tsxのみです。"),
  ]),
  extension: enum_(Extension),
  objectId: string(),
});

const defaultFileSchema = object({
  type: literal("default"),
  objectId: string(),
  extension: enum_(Extension),
});

export const editFileSchema = variant("type", [
  inputFileSchema,
  defaultFileSchema,
]);

export type InputFileType = Input<typeof inputFileSchema>;
export type DefaultFileType = Input<typeof defaultFileSchema>;
export type EditFileInput = Input<typeof editFileSchema>;

export const previewTypeSchema = variant("type", [
  object({
    type: literal("html"),
    functionName: null_(),
  }),
  object({
    type: literal("react"),
    functionName: string(),
  }),
]);

export type PreviewType = Input<typeof previewTypeSchema>;

export const editFilesSchema = object({
  files: array(editFileSchema, [
    minLength(1, "ファイルを1つ以上選択してください。"),
    maxLength(3, "ファイルは3つまで選択できます。"),
    custom(customArrayValidation, "ファイルの組み合わせが不正です。"),
  ]),
  previewType: previewTypeSchema,
});

export type EditFilesInput = Input<typeof editFilesSchema>;
