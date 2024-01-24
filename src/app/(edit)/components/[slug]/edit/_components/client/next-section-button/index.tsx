"use client";

import React from "react";
import { useRedirectSectionHandler } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/section";
import { EditingSteps } from "@/app/(edit)/components/[slug]/edit/_hooks/types";

import { Button, ButtonProps } from "@/components/ui/button";

type NextSectionButtonProps = {
  currentSection: EditingSteps;
  isDirty?: boolean;
} & ButtonProps;

export const NextSectionButton = ({
  currentSection,
  children,
  isDirty,
  onClick,
  ...props
}: NextSectionButtonProps) => {
  const { onNextSection } = useRedirectSectionHandler(currentSection);

  const onNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    onNextSection();
    onClick?.(e);
  };

  return (
    <Button
      onClick={isDirty ? undefined : onNext}
      type={isDirty ? "submit" : "button"}
      {...props}
    >
      {children ?? isDirty ? "保存して次へ" : "次へ"}
    </Button>
  );
};
