import { useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { isForceMountAtom } from "@/app/(edit)/components/[slug]/edit/_features/files/context";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";

export function ChangeFunctionName() {
  const setForceMount = useSetAtom(isForceMountAtom);

  useEffect(() => {
    setForceMount(false);
  }, [setForceMount]);

  return <UIPreviewLoading name="changing preview..." />;
}
