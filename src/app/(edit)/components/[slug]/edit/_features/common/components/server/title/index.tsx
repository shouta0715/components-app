import { Asterisk } from "lucide-react";
import React from "react";
import { cn } from "@/utils";

export function EditSectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "my-10 flex scroll-m-20 flex-col text-2xl font-semibold tracking-tight sm:text-3xl",
        className
      )}
    >
      <span>{children}</span>
      <span className="mt-4 flex items-center">
        <Asterisk
          aria-hidden
          className="mr-1 inline-block size-4 text-red-500"
        />
        <span className="text-sm font-normal text-muted-foreground">
          は必須項目です。
        </span>
      </span>
    </h2>
  );
}
