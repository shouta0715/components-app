"use client";

import { Loader2 } from "lucide-react";
import React from "react";
import { useRedirectSectionHandler } from "@/app/(app)/(edit)/components/[slug]/edit/_features/section/hooks";
import { EditingSteps } from "@/app/(app)/(edit)/components/[slug]/edit/_features/section/types";

import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/utils";

function getText(
  isLoading: boolean,
  children?: React.ReactNode,
  isDirty?: boolean
) {
  if (children) return children;

  if (isLoading) return "Loading...";

  if (isDirty) return "保存して次のセクションへ";

  return "次のセクションへ";
}

type NextSectionButtonProps = {
  currentSection: EditingSteps;
  isDirty?: boolean;
  isLoading: boolean;
} & ButtonProps;

export const NextSectionButton = ({
  currentSection,
  children,
  isDirty,
  isLoading,
  disabled,
  className,
  onClick,
  ...props
}: NextSectionButtonProps) => {
  const { onNextSection } = useRedirectSectionHandler();

  const onNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    onNextSection(currentSection);
    onClick?.(e);
  };

  return (
    <Button
      className={cn(
        "w-52 ml-auto flex z-20 font-semibold sticky bottom-6",
        className
      )}
      disabled={isLoading || disabled}
      onClick={isDirty ? undefined : onNext}
      type={isDirty ? "submit" : "button"}
      {...props}
    >
      {children ?? (
        <>
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {getText(isLoading, children, isDirty)}
        </>
      )}
    </Button>
  );
};
