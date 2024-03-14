import clsx from "clsx";
import { useAtomValue } from "jotai";
import React from "react";
import { canPublishAtom } from "@/app/(app)/(edit)/components/[slug]/edit/_features/section/contexts";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function TogglePublish({
  onChangeDraft,
  draft,
}: {
  draft: boolean;
  onChangeDraft: (value: boolean) => void;
}) {
  const canPublish = useAtomValue(canPublishAtom);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        defaultChecked={!draft}
        disabled={!canPublish}
        id="draft"
        onCheckedChange={(checked) => onChangeDraft(!checked)}
      />
      <Label
        className={clsx(
          "text-sm ",
          !canPublish ? "pointer-events-none opacity-50" : "font-semibold"
        )}
        htmlFor="draft"
      >
        公開する
      </Label>
    </div>
  );
}
