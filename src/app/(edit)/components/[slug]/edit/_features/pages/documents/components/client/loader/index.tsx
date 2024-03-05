import { Loader2 } from "lucide-react";
import React from "react";

export function DocumentLoader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Loader2
        aria-busy="true"
        aria-label="loading"
        aria-live="polite"
        className="mx-auto size-8 animate-spin text-primary"
      />
      <p>{children}</p>
    </div>
  );
}
