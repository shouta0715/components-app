import { Loader, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export function CategoryFormLoader() {
  return (
    <div className="group inline-block">
      <Label required>Category</Label>
      <Skeleton
        aria-busy
        className="mt-3 inline-flex h-10 w-72 items-center justify-between rounded-md border border-input px-4 py-2 text-sm sm:w-80"
      >
        Loading Category
        <Loader2 className="ml-2 h-4 w-4 shrink-0 animate-spin opacity-50" />
      </Skeleton>
    </div>
  );
}

export function PreviewDropZoneLoader() {
  return (
    <Skeleton className="relative flex h-96 cursor-pointer justify-center rounded-lg  border border-dashed border-border px-4 pb-5 pt-10 sm:px-0 ">
      <div className="flex flex-col items-center justify-center">
        {/* children is Icons */}
        <Loader
          aria-hidden="true"
          className="mx-auto h-12 w-12 animate-spin text-gray-300 transition-colors duration-150 dark:text-gray-400"
        />

        {/* Input Zone */}
        <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
          <span className="flex cursor-pointer items-center">
            <span>Loading Preview Uploader</span>
          </span>
        </div>
      </div>
    </Skeleton>
  );
}
