import { User } from "next-auth";
import { BaseSchema, Input, parse, safeParse } from "valibot";
import { UnauthorizedError } from "@/lib/errors";

export function validate<T extends BaseSchema>(
  target: unknown,
  schema: T
): asserts target is Input<T> {
  parse(schema, target);
}

export const safeValidate = <T extends BaseSchema>(
  target: unknown,
  schema: T
) => {
  return safeParse<T>(schema, target);
};

export function assertUser(user?: User): asserts user is User {
  if (!user) throw new UnauthorizedError();
}
