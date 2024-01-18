"use client";

import { useHydrateAtoms } from "jotai/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import { editStatusAtom } from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { CheckEditStatusData } from "@/app/(edit)/components/[slug]/edit/_hooks/types";
import {
  getInitialEditStatus,
  paramsToEditingStep,
} from "@/app/(edit)/components/[slug]/edit/_hooks/utils";
import { EditComp } from "@/types/prisma";

export function HydrateEditAtom({
  children,
  data,
}: {
  children: React.ReactNode;
  data: EditComp;
}) {
  const { name, draft, files, document } = data;
  const checkStatusData: CheckEditStatusData = {
    name,
    document,
    draft,
    fileLength: files.length,
  };

  const searchParams = useSearchParams();

  const section = paramsToEditingStep(searchParams.get("section"));

  useHydrateAtoms(
    new Map([[editStatusAtom, getInitialEditStatus(checkStatusData, section)]])
  );

  return children;
}
