"server only";

import { Loader } from "lucide-react";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function FrameLoading() {
  return <Skeleton className="h-96 w-full rounded-md border" />;
}

export function SuspenseFrameLoading({ name }: { name: string }) {
  return (
    <div className="px-2">
      <div className="grid overflow-hidden rounded-md border border-border">
        <div className=" flex items-center gap-2 border-b border-border p-4">
          <Loader className="animate-spin" size={16}>
            <span className="sr-only">
              プレビューをロード中です。しばらくお待ちください。
            </span>
          </Loader>
          <div className="group flex size-3.5 animate-pulse cursor-not-allowed items-center justify-center rounded-full bg-[#febc2e]">
            <span className="sr-only">
              {name}のプレビューをロード中です。しばらくお待ちください。
            </span>
          </div>
          <div className="group flex size-3.5 animate-pulse cursor-not-allowed items-center justify-center rounded-full bg-[#28c840]">
            <span className="sr-only">
              プレビューをロード中です。しばらくお待ちください。
            </span>
          </div>
          <p className="ml-2 line-clamp-1 flex-1 text-xs font-semibold text-primary">
            {name}
          </p>
        </div>
        <div className="relative overflow-hidden p-2 sm:p-4">
          <FrameLoading />
        </div>
      </div>
    </div>
  );
}
