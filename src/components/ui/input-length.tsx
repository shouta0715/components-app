import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  useWatch,
} from "react-hook-form";
import { cn } from "@/utils";

export function InputLength<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  maxLength,
  overClassName,
  ...props
}: {
  name: TFieldName;
  defaultValue?: FieldPathValue<TFieldValues, TFieldName>;
  control?: Control<TFieldValues>;
  disabled?: boolean;
  exact?: boolean;
  className?: string;
  maxLength?: number;
  overClassName?: string;
}) {
  const value = useWatch(props);

  return (
    <span
      aria-label="文字数"
      aria-live="polite"
      className={cn(
        "tabular-nums",
        className,
        maxLength && value?.length > maxLength
          ? cn("text-red-500", overClassName)
          : "text-muted-foreground"
      )}
    >
      {value?.length ?? 0}
    </span>
  );
}
