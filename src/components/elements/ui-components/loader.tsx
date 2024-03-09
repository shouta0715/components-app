/* eslint-disable react/no-array-index-key */
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function UIComponentLoader({ length = 6 }: { length?: number }) {
  return (
    <>
      {Array.from({ length }).map((_, i) => (
        <div
          key={`ui-component-loader-${i}`}
          aria-busy="true"
          aria-live="polite"
          className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow"
        >
          <Skeleton aria-hidden="true" className="h-52" />
          <div className="p-4">
            <div className="flex items-center justify-between">
              <Skeleton aria-hidden="true" className="h-6 w-40" />
              <Skeleton aria-hidden="true" className="h-4 w-24" />
            </div>

            <div className="mt-2 flex items-center">
              <Skeleton aria-hidden="true" className="size-10" />
              <div className="ml-2 flex-1">
                <Skeleton aria-hidden="true" className="h-3 w-28" />
                <div className="mt-2 flex items-center">
                  <Skeleton aria-hidden="true" className=" h-3 w-20" />
                  <Skeleton aria-hidden="true" className="ml-1 size-4" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Skeleton aria-hidden="true" className="h-8 w-28" />
              <div className="flex gap-x-2">
                {Array.from({ length: 3 }).map((__, j) => {
                  return (
                    <Skeleton
                      key={`ui-component-loader-extension-${j}`}
                      aria-hidden="true"
                      className="size-6"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading Components...</span>
    </>
  );
}
