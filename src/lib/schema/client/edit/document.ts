import { Input, minLength, object, string, toTrimmed } from "valibot";

export const editDocumentSchema = string("1文字以上入力してください", [
  toTrimmed(),
  minLength(1, "1文字以上入力してください"),
]);

export const formEditDocumentSchema = object({
  document: editDocumentSchema,
});

export type EditDocumentInput = Input<typeof editDocumentSchema>;
export type FormEditDocumentInput = { document: EditDocumentInput };
