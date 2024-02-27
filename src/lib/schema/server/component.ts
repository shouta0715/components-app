import {
  Input,
  boolean,
  minLength,
  object,
  optional,
  string,
  toTrimmed,
} from "valibot";
import { editDocumentSchema } from "@/lib/schema/client/edit/document";
import {
  summaryCategoryNameSchema,
  summaryDescriptionSchema,
  summaryNameSchema,
} from "@/lib/schema/client/edit/summary";
import { isRequiredOneField } from "@/lib/schema/server/custom";

export const componentUpdateSchema = object(
  {
    name: optional(summaryNameSchema),
    description: optional(summaryDescriptionSchema),
    previewUrl: optional(string([toTrimmed(), minLength(1)])),
    draft: optional(boolean()),
    categoryName: optional(summaryCategoryNameSchema),
    document: optional(editDocumentSchema),
  },
  [isRequiredOneField()]
);

export type ComponentUpdateInput = Input<typeof componentUpdateSchema>;
