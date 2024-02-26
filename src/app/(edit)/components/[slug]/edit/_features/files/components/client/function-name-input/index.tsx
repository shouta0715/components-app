import clsx from "clsx";
import React from "react";
import { useFunctionNameInput } from "@/app/(edit)/components/[slug]/edit/_features/files/hooks/function-name";
import { FunctionNameInputProps } from "@/app/(edit)/components/[slug]/edit/_features/files/types/function-name";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FunctionNameInput({
  control,
  defaultValues,
  onCompleteFunctionName,
  register,
}: FunctionNameInputProps) {
  const { disabled, type, changed, onChange, onClickComplete } =
    useFunctionNameInput({
      control,
      defaultValues,
      onCompleteFunctionName,
    });

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
          onChange={onChange}
          placeholder="Example"
          type="text"
        />
        <Button
          className="font-semibold"
          disabled={!changed}
          onClick={() => {
            onClickComplete();
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
