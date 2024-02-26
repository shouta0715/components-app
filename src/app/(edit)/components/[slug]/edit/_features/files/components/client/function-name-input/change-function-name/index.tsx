import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { isChangedFNAtom } from "@/app/(edit)/components/[slug]/edit/_features/files/context";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";

export function ChangeFunctionName() {
  const setIsChangedFunctionName = useSetAtom(isChangedFNAtom);

  useEffect(() => {
    setIsChangedFunctionName(false);
  }, [setIsChangedFunctionName]);

  return <UIPreviewLoading name="changed preview..." />;
}
