"use client";

import { useSetAtom } from "jotai";
import React from "react";
import { onRedirectEditAtom } from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import {
  useHydrateSection,
  useInitializeSection,
} from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/section";
import { EditingSteps } from "@/app/(edit)/components/[slug]/edit/_hooks/types";

import { NavigateTabs } from "@/components/ui/tabs";
import { EditComp } from "@/types/prisma";

function EditSectionTab({
  children,
  section,
}: {
  children: React.ReactNode;
  section: EditingSteps;
}) {
  const onRedirect = useSetAtom(onRedirectEditAtom);
  useInitializeSection();

  return (
    <NavigateTabs<EditingSteps>
      defaultValue="summary"
      onValueChange={onRedirect}
      params="section"
      redirectType="manual"
      value={section}
    >
      {children}
    </NavigateTabs>
  );
}

export function HydrateEditSection({
  children,
  data,
}: {
  children: React.ReactNode;
  data: EditComp;
}) {
  const { section } = useHydrateSection(data);

  return <EditSectionTab section={section}>{children}</EditSectionTab>;
}
