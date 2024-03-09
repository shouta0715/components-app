"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/utils";

type QueryPaginationProps = {
  total: number;
  take?: number;
  prevButtonProps?: Omit<ButtonProps, "children" | "onClick">;
  nextButtonProps?: Omit<ButtonProps, "children" | "onClick">;
  className?: string;
};

export function SearchParamsPagination({
  total,
  take = 20,
  className,
  prevButtonProps,
  nextButtonProps,
}: QueryPaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = searchParams.get("page") || 1;
  const hasNext = total > +currentPage * take;
  const hasPrev = +currentPage > 1;

  const onTransition = (type: "prev" | "next") => {
    return () => {
      const params = new URLSearchParams(searchParams.toString());

      if (type === "prev") {
        params.set("page", (+currentPage - 1).toString());
        const url = `${pathname}?${params.toString()}`;
        router.push(url);
      } else {
        params.set("page", (+currentPage + 1).toString());
        const url = `${pathname}?${params.toString()}`;
        router.push(url);
      }
    };
  };

  return (
    <>
      {hasPrev && (
        <Button
          onClick={onTransition("prev")}
          {...prevButtonProps}
          className={cn(className, prevButtonProps?.className)}
        >
          <ChevronLeft className="mr-1" /> 前のページ
        </Button>
      )}
      {hasNext && (
        <Button
          onClick={onTransition("next")}
          {...nextButtonProps}
          className={cn(className, nextButtonProps?.className)}
        >
          次のページ <ChevronRight className="ml-1" />
        </Button>
      )}
    </>
  );
}
