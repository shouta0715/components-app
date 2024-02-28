import { custom } from "valibot";

export function isRequiredOneField(message = "At least one field is required") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return custom((input: Record<string, any>) => {
    const allUndefined = Object.values(input).every(
      (v) =>
        v === undefined ||
        v === null ||
        v === "" ||
        (Array.isArray(v) && v.length === 0)
    );

    return !allUndefined;
  }, message);
}
