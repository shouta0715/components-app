import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useHistory } from "@/lib/next/hooks";

export function useDocumentNavigation() {
  const { replace } = useHistory();
  const { get } = useSearchParams();

  useEffect(() => {
    const toggleMode = (e: KeyboardEvent) => {
      if (e.key !== "p" || !e.metaKey) return;
      e.preventDefault();
      const mode = get("mode");

      replace({ mode: mode === "preview" ? "write" : "preview" });
    };

    window.addEventListener("keydown", toggleMode);

    return () => window.removeEventListener("keydown", toggleMode);
  }, [get, replace]);

  const ref = React.useRef<HTMLDivElement>(null);

  const mode = get("mode") === "preview" ? "preview" : "write";

  return { ref, mode };
}
