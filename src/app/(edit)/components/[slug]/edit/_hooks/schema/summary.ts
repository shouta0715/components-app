import {
  Input,
  cuid2,
  maxLength,
  minLength,
  nullable,
  object,
  string,
  toTrimmed,
  url,
} from "valibot";

export const summaryNameSchema = string([
  toTrimmed(),
  minLength(1, "名前は1文字以上入力してください。"),
  maxLength(50, "名前は50文字以下で入力してください。"),
]);

export const summaryDescriptionSchema = nullable(
  string([toTrimmed(), maxLength(200, "説明は200文字以下で入力してください。")])
);

export const editSummarySchema = object({
  name: summaryNameSchema,
  description: summaryDescriptionSchema,
  previewUrl: string([toTrimmed(), url()]),
  categoryId: string([toTrimmed(), cuid2()]),
});

export type EditSummaryInput = Input<typeof editSummarySchema>;
