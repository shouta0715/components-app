import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type TogglePreviewTypeProps = {
  setPreviewType: (type: "html" | "react") => void;
  defaultType?: "html" | "react";
};

export function TogglePreviewType({
  setPreviewType,
  defaultType,
}: TogglePreviewTypeProps) {
  const [type, setType] = React.useState<"html" | "react">(
    defaultType || "html"
  );

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
          onCheckedChange={() => {
            setType((prev) => (prev === "html" ? "react" : "html"));
            setPreviewType(type === "html" ? "react" : "html");
          }}
        />
        <span>React</span>
      </div>
    </Label>
  );
}
