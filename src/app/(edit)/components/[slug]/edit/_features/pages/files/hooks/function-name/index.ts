import { useState } from "react";
import { useWatch } from "react-hook-form";
import { FunctionNameInputProps } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/types/function-name";
import { isCapitalize } from "@/utils/capitalize";

export function useFunctionNameInput({
  control,
  defaultValues,
  onCompleteFunctionName,
}: Omit<FunctionNameInputProps, "register" | "errors">) {
  const [value, setValue] = useState(
    defaultValues?.previewType?.functionName ?? ""
  );
  const [type, fn] = useWatch({
    control,
    name: ["previewType.type", "previewType.functionName"],
  });

  const disabled = type === "html";

  const changed = fn !== value && value !== "";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClickComplete = () => {
    if (disabled) return;
    if (value === "") return;
    const capitalize = isCapitalize(value);

    if (!capitalize) {
      control.setError("previewType.functionName", {
        type: "manual",
        message: "関数名は大文字で始めてください。",
      });

      return;
    }

    onCompleteFunctionName(value);
  };

  return {
    disabled,
    changed,
    type,
    onChange,
    onClickComplete,
  };
}
