import clsx from "clsx";
import React, { useState } from "react";
import {
  Control,
  DeepPartial,
  UseFormRegister,
  useWatch,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditFilesInput } from "@/lib/schema/client/edit/files";

type FunctionNameInputProps = {
  control: Control<EditFilesInput>;
  defaultValues?: Readonly<DeepPartial<EditFilesInput>>;
  onCompleteFunctionName: (value: string) => void;
  register: UseFormRegister<EditFilesInput>;
};

export function FunctionNameInput({
  control,
  defaultValues,
  onCompleteFunctionName,
  register,
}: FunctionNameInputProps) {
  const [value, setValue] = useState(
    defaultValues?.previewType?.functionName ?? ""
  );
  const type = useWatch({
    control,
    name: "previewType.type",
  });

  const disabled = type === "html";
  const changed =
    value !== defaultValues?.previewType?.functionName && value !== "";

  return (
    <fieldset className="grid flex-1 gap-3" disabled={disabled}>
      <Label
        className={disabled ? "opacity-50" : ""}
        htmlFor="function-name"
        required={type === "react"}
      >
        <span>表示するコンポーネントの関数名</span>
      </Label>
      <span
        className={clsx(
          "text-xs text-muted-foreground",
          disabled ? "" : "pl-4"
        )}
      >
        ※HTMLの場合は関数名は不要です
      </span>
      <div className="flex items-center gap-3">
        <Input
          {...register("previewType.functionName")}
          className="placeholder:text-sm sm:max-w-md"
          defaultValue={defaultValues?.previewType?.functionName ?? ""}
          disabled={disabled}
          id="function-name"
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="Example"
          type="text"
        />
        <Button
          className="font-semibold"
          disabled={!changed}
          onClick={() => {
            if (disabled) return;
            if (value === "") return;

            onCompleteFunctionName(value);
          }}
          size="sm"
          type="button"
        >
          決定
        </Button>
      </div>
    </fieldset>
  );
}
