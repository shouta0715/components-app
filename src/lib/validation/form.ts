import { BaseSchema, safeParse } from "valibot";

export function validateForm(target: unknown, schema: BaseSchema) {
  const valid = safeParse(schema, target);

  if (valid.success) return true;

  if (valid.issues.length > 1) {
    const messages = valid.issues.map((issue) => issue.message);

    return messages.join(" ");
  }

  return valid.issues[0].message;
}
