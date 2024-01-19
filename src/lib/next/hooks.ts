import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Params = Record<string, string>;

export function useHistory() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const push = useCallback(
    (params: Params) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        newParams.set(key, value);
      });

      window.history.pushState(null, "", `${pathname}?${newParams}`);
    },
    [pathname, searchParams]
  );

  const replace = useCallback(
    (params: Params) => {
      const newParams = new URLSearchParams(searchParams);

      Object.entries(params).forEach(([key, value]) => {
        newParams.set(key, value);
      });

      window.history.replaceState(null, "", `${pathname}?${newParams}`);
    },
    [pathname, searchParams]
  );

  return { push, replace };
}
