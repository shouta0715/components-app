"use client";

import React, { forwardRef } from "react";
import { EditingSteps } from "@/app/(edit)/components/[slug]/edit/_hooks/types";
import { getNextEditingStep } from "@/app/(edit)/components/[slug]/edit/_hooks/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { useHistory } from "@/lib/next/hooks";

type NextSectionButtonProps = {
  currentSection: EditingSteps;
  isDirty: boolean;
} & ButtonProps;

export const NextSectionButton = forwardRef<
  HTMLButtonElement,
  NextSectionButtonProps
>(({ currentSection, isDirty, onClick, ...props }, ref) => {
  const { replace } = useHistory();

  return (
    <Button
      ref={ref}
      onClick={(e) => {
        replace({
          section: getNextEditingStep(currentSection),
        });
        onClick?.(e);
      }}
      type={isDirty ? "submit" : "button"}
      {...props}
      value="files"
    >
      保存して次へ
    </Button>
  );
});
