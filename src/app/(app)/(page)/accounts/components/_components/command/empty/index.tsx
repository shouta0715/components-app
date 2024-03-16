import React from "react";
import { CommandEmpty } from "@/components/ui/command";

function MeCommandEmpty() {
  return (
    <CommandEmpty>
      <p className="text-sm text-muted-foreground">
        投稿が見つかりませんでした
      </p>
    </CommandEmpty>
  );
}

export default MeCommandEmpty;
