import { useState } from "react";
import { useWatch } from "react-hook-form";
import { FunctionNameInputProps } from "@/app/(edit)/components/[slug]/edit/_features/files/types/function-name";

export function useFunctionNameInput({
  control,
  defaultValues,
  onCompleteFunctionName,
}: Omit<FunctionNameInputProps, "register">) {
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClickComplete = () => {
    if (disabled) return;
    if (value === "") return;

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
