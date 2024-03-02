import React from "react";

import { useTogglePreviewType } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/hooks/toggle-preview-type";
import { TogglePreviewTypeProps } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/types/toggle-preview-type";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function TogglePreviewType({
  setPreviewType,
  defaultType,
  control,
}: TogglePreviewTypeProps) {
  const { onCheckedChange, type } = useTogglePreviewType({
    defaultType,
    setPreviewType,
    control,
  });

  return (
    <Label className="grid gap-3">
      <span className="text-xs font-medium text-gray-900">
        プレビューするファイルの種類の選択
      </span>
      <div className="flex items-center gap-4">
        <span>HTML</span>
        <Switch
          checked={type === "react"}
          className="focus-visible:ring-0 data-[state=checked]:bg-[#0288D1] data-[state=unchecked]:bg-[#E44D26]"
          onCheckedChange={onCheckedChange}
        />
        <span>React</span>
      </div>
    </Label>
  );
}
