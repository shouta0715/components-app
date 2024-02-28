import {
  Input,
  ValiError,
  array,
  number,
  object,
  optional,
  string,
} from "valibot";
import { isRequiredOneField } from "@/lib/schema/server/custom";
import { validate } from "@/lib/validation";

const schema = object(
  {
    string: optional(string()),
    number: optional(number()),
    object: optional(
      object({
        string: optional(string()),
      })
    ),
    array: optional(array(string())),
  },
  [isRequiredOneField()]
);

type InputSchema = Input<typeof schema>;

describe("Valibot Custom Schema", () => {
  describe("isRequiredOneField", async () => {
    test("success", async () => {
      const st: InputSchema = {
        string: "string",
      };

      expect(() => validate(st, schema)).not.toThrowError();

      const num: InputSchema = {
        number: 1,
      };

      expect(() => validate(num, schema)).not.toThrowError();

      const obj: InputSchema = {
        object: {
          string: "string",
        },
      };

      expect(() => validate(obj, schema)).not.toThrowError();

      const arr: InputSchema = {
        array: ["string"],
      };

      expect(() => validate(arr, schema)).not.toThrowError();

      const all: InputSchema = {
        string: "string",
        number: 1,
        object: {
          string: "string",
        },
        array: ["string"],
      };

      expect(() => validate(all, schema)).not.toThrowError();
    });

    test("failure", async () => {
      const empty: InputSchema = {};

      expect(() => validate(empty, schema)).toThrowError(ValiError);
    });
  });
});
