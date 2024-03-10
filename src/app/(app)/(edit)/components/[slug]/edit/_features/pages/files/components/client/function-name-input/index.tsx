import clsx from "clsx";
import React from "react";
import { useFunctionNameInput } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/files/hooks/function-name";
import { FunctionNameInputProps } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/files/types/function-name";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FunctionNameInput({
  control,
  defaultValues,
  onCompleteFunctionName,
  errors,
}: FunctionNameInputProps) {
  const { disabled, type, changed, value, onChange, onClickComplete, onBlur } =
    useFunctionNameInput({
      control,
      defaultValues,
      onCompleteFunctionName,
    });

  return (
    <fieldset className="grid max-w-sm flex-1 gap-3" disabled={disabled}>
      <Label
        className={clsx("text-sm", disabled ? "opacity-50" : "h-5")}
        htmlFor="function-name"
        required={type === "react"}
      >
        表示するコンポーネントの関数名
      </Label>
      <span
        className={clsx(
          "text-xs text-muted-foreground",
          disabled ? "" : "pl-4"
        )}
      >
        ※HTMLの場合は関数名は不要です
      </span>
      <div className="flex items-center gap-x-2">
        <Input
          className="bg-background/30 placeholder:text-sm"
          disabled={disabled}
          id="function-name"
          onBlur={onBlur}
          onChange={onChange}
          placeholder={
            disabled ? "HTMLの場合は関数名は不要です" : "関数名を入力..."
          }
          type="text"
          value={value}
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
      <ErrorMessage className="mt-1">
        {errors.previewType?.functionName?.message}
      </ErrorMessage>
    </fieldset>
  );
}
