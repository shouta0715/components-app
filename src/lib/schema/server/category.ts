import {
  Input,
  maxLength,
  minLength,
  object,
  string,
  toLowerCase,
  toTrimmed,
} from "valibot";

export const categorySchema = object({
  name: string([
    toTrimmed(),
    minLength(3, "名前は3文字以上で入力してください"),
    maxLength(25, "名前は25文字以下で入力してください"),
    toLowerCase(),
  ]),
  description: string([
    toTrimmed(),
    minLength(5, "説明は5文字以上で入力してください"),
    maxLength(100, "説明は100文字以下で入力してください"),
  ]),
});

export type CategoryInput = Input<typeof categorySchema>;
