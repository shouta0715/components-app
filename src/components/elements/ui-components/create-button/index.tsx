import { ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  CreateDraftCompInitialValues,
  createDraftComp,
} from "@/actions/components/create";
import { AuthForm } from "@/components/ui/auth-form";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

type CreateComponentButtonProps = {
  buttonClassName?: string;
  children?: React.ReactNode;
  initialValues?: CreateDraftCompInitialValues;
} & ButtonProps;

export function CreateComponentButton({
  buttonClassName,
  children,
  className,
  initialValues,
  ...buttonProps
}: CreateComponentButtonProps) {
  return (
    <AuthForm
      action={async () => {
        "use server";

        return createDraftComp(initialValues);
      }}
      className={cn(
        buttonVariants({
          variant: "outline",
          className: "font-bold",
          ...buttonProps,
        }),
        "px-0 py-0",
        className
      )}
    >
      <button
        className={cn(
          "flex w-full items-center justify-center px-4 py-2 text-center",
          buttonClassName
        )}
        type="submit"
      >
        {children || (
          <span>
            作成する
            <ChevronRightIcon className="ml-2 hidden h-5 w-5 sm:inline-block" />
          </span>
        )}
      </button>
    </AuthForm>
  );
}
