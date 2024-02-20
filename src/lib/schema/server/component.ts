import {
  boolean,
  minLength,
  object,
  optional,
  string,
  toTrimmed,
} from "valibot";
import {
  summaryCategoryNameSchema,
  summaryDescriptionSchema,
  summaryNameSchema,
} from "@/app/(edit)/components/[slug]/edit/_hooks/schema/summary";

export const componentSchema = object({
  name: optional(summaryNameSchema),
  description: optional(summaryDescriptionSchema),
  previewUrl: optional(string([toTrimmed(), minLength(1)])),
  draft: optional(boolean()),
  categoryName: optional(summaryCategoryNameSchema),
});
