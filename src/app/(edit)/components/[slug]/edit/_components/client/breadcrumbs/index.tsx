"use client";

import clsx from "clsx";
import { useAtomValue } from "jotai";
import { BadgeCheck, BoxSelect, ChevronRight, Loader } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  EditStatusValue,
  EditingSteps,
  editStatusAtom,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { EditingPencil } from "@/components/icons/EditingPencil";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

const StatusIcon: {
  [K in EditStatusValue]: React.ReactNode;
} = {
  CREATED: (
    <BadgeCheck className="size-4 text-green-500 sm:size-5  dark:text-green-600" />
  ),
  LOADING: (
    <Loader className="size-4 animate-spin text-muted-foreground sm:size-5" />
  ),
  EDITING: <EditingPencil className="size-6 sm:size-7" />,
  EMPTY: <BoxSelect className="size-4 text-muted-foreground  sm:size-5" />,
  EMPTY_EDITING: <EditingPencil className="size-6 sm:size-7" />,
};

const paths: Array<{
  name: EditingSteps;
}> = [
  {
    name: "Summary",
  },
  {
    name: "Files",
  },
  {
    name: "Document",
  },
];

export function EditBreadcrumbs() {
  const values = useAtomValue(editStatusAtom);
  const pathname = usePathname();
  const isLoading =
    values.Summary === "LOADING" ||
    values.Files === "LOADING" ||
    values.Document === "LOADING";

  return (
    <div>
      <nav aria-label="Breadcrumb" className="flex">
        <ol className="flex items-center space-x-4">
          {paths.map(({ name }, i) => {
            const lastPath = pathname.split("/").pop();
            const active = lastPath === name.toLowerCase();
            let canNext = true;

            if (i !== 0) {
              const prevPath = paths[i - 1].name;
              canNext =
                values[prevPath] !== "EMPTY" &&
                values[prevPath] !== "EMPTY_EDITING";
            }

            const clickable = canNext && !isLoading;

            return (
              <li key={name}>
                <div className="flex items-center">
                  {i !== 0 && (
                    <ChevronRight
                      className={clsx(
                        "h-5 w-5 text-muted-foreground",
                        clickable ? "" : "opacity-50"
                      )}
                    />
                  )}

                  <Link
                    aria-current={active ? "page" : undefined}
                    aria-disabled={isLoading || !clickable}
                    aria-label={name}
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant: "link",
                        className:
                          "ml-4 text-xs h-auto p-0 sm:text-sm font-medium relative",
                      }),
                      active
                        ? "text-primary hover:no-underline"
                        : "text-muted-foreground hover:text-primary",
                      clickable ? "" : "pointer-events-none opacity-50",
                      isLoading && active ? "opacity-100" : ""
                    )}
                    href={`${name.toLowerCase()}`}
                    tabIndex={clickable ? 0 : -1}
                  >
                    {StatusIcon[values[name]]}
                    <span className="mx-2">{name}</span>
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
