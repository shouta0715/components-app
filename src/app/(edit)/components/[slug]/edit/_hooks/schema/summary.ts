import {
  Input,
  blob,
  literal,
  maxLength,
  minLength,
  nullable,
  object,
  string,
  toTrimmed,
  variant,
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
  previewUrl: variant("type", [
    object({
      type: literal("input"),
      value: blob(),
    }),
    object({
      type: literal("default"),
      value: string([
        toTrimmed(),
        minLength(1, "Preview用の画像を選択してください。"),
      ]),
    }),
  ]),
  categoryName: string([
    toTrimmed(),
    minLength(1, "カテゴリーを選択してください。"),
  ]),
});

export type EditSummaryInput = Input<typeof editSummarySchema>;
