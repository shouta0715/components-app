"use client";

import React from "react";

import {
  useHydrateSection,
  useInitializeSection,
} from "@/app/(app)/(edit)/components/[slug]/edit/_features/section/hooks";
import { EditingSteps } from "@/app/(app)/(edit)/components/[slug]/edit/_features/section/types";

import { NavigateTabs } from "@/components/ui/tabs";
import { EditComp } from "@/types/prisma";

function EditSectionTab({
  children,
  section,
}: {
  children: React.ReactNode;
  section: EditingSteps;
}) {
  useInitializeSection();

  return (
    <NavigateTabs<EditingSteps>
      defaultValue="summary"
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
