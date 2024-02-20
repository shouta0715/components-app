import { Input, minLength, string, toTrimmed } from "valibot";

export const editDocumentSchema = string([
  toTrimmed(),
  minLength(1, "1文字以上入力してください。"),
]);

export type EditDocumentInput = Input<typeof editDocumentSchema>;
