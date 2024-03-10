import React from "react";
import { UIPreviewLoading } from "@/components/elements/files/ui-preview/client/loading";
import { Skeleton } from "@/components/ui/skeleton";

export function FileNavigationLoading() {
  return (
    <div className="space-y-4">
      <div aria-busy="true" aria-live="polite">
        <div className="flex h-9 items-center gap-x-6 border-b px-3 text-xs">
          プレビューをロード中...
        </div>
        <div className="mt-6">
          <UIPreviewLoading name="Loading..." />
        </div>
      </div>
      <div className=" flex items-center gap-x-4">
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="mt-2">
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}
