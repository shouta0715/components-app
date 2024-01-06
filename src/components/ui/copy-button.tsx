"use client";

import copy from "copy-to-clipboard";
import { Check, Clipboard } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@/utils";

export function CopyButton({
  value,
  className,
  isToast = true,
}: {
  value: string;
  className?: string;
  isToast?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (!copied) return undefined;

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <button
      className={cn(
        "text-muted-foreground bg-primary dark:bg-primary-foreground hover:bg-gray-800 p-2 rounded-md",
        className
      )}
      disabled={copied}
      onClick={() => {
        copy(value);
        setCopied(true);
        if (!isToast) return;

        toast.success("COPIED!!", {
          duration: 2000,
        });
      }}
      type="button"
    >
      {copied ? (
        <Check className="size-3 text-green-400 sm:size-4" />
      ) : (
        <Clipboard className="size-3  sm:size-4" />
      )}
    </button>
  );
}
