import clsx from "clsx";
import { useAtomValue } from "jotai";
import React from "react";
import { canPublishAtom } from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function TogglePublish({
  onChangePublish,
  publish,
}: {
  publish: boolean;
  onChangePublish: (value: boolean) => void;
}) {
  const canPublish = useAtomValue(canPublishAtom);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        defaultChecked={publish}
        disabled={!canPublish}
        onCheckedChange={onChangePublish}
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
