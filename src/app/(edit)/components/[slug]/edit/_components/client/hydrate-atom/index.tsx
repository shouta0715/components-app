"use client";

import { useHydrateAtoms } from "jotai/utils";
import React from "react";
import {
  EditStatus,
  editStatusAtom,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";

export function HydrateEditAtom({
  children,
  initialEditStatus,
}: {
  children: React.ReactNode;
  initialEditStatus: EditStatus;
}) {
  useHydrateAtoms(new Map([[editStatusAtom, initialEditStatus]]), {
    dangerouslyForceHydrate: true,
  });

  return children;
}
