"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export function ResetFormButton({
  onReset,
  isDirty,
}: {
  onReset: () => void;
  isDirty: boolean;
}) {
  return (
    <Button
      className="h-auto py-2 text-xs font-semibold transition-all"
      disabled={!isDirty}
      onClick={onReset}
      variant="destructive"
    >
      入力をリセット
    </Button>
  );
}
