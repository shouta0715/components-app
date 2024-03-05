import React from "react";

import { useTogglePreviewType } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/hooks/toggle-preview-type";
import { TogglePreviewTypeProps } from "@/app/(edit)/components/[slug]/edit/_features/pages/files/types/toggle-preview-type";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <fieldset className="w-80 space-y-3">
      <Label className="text-sm" required>
        プレビューするファイルの種類
      </Label>
      <p className="pl-4 text-xs text-muted-foreground">
        ファイルの形式を選択してください。
      </p>
      <Select onValueChange={onCheckedChange} value={type}>
        <SelectTrigger className="w-full bg-background/30">
          <SelectValue placeholder="プレビューするファイルの種類を選択">
            {type === "react" ? "React" : "HTML"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-80">
          <SelectGroup>
            <SelectItem
              className="group flex w-full flex-col focus:bg-primary focus:text-background"
              onClick={onCheckedChange}
              value="react"
            >
              <span className="font-semibold">React</span>
              <div className="mt-1 text-xs text-muted-foreground group-focus:text-muted">
                .jsx or
                .tsxのファイルと、exportしている関数名を入力するとプレビューできます。
              </div>
            </SelectItem>
            <SelectItem
              className="group flex w-full flex-col focus:bg-primary focus:text-background"
              onClick={onCheckedChange}
              value="html"
            >
              <span className="font-semibold">HTML</span>
              <div className="mt-1 text-xs text-muted-foreground group-focus:text-muted">
                .htmlのファイルを入力するとプレビューできます。
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </fieldset>
  );
}
