"use client";

import clsx from "clsx";
import { useAtomValue, useSetAtom } from "jotai";
import { BadgeCheck, BoxSelect, ChevronRight, Loader } from "lucide-react";
import React from "react";
import {
  editPaths,
  editStatusAtom,
  onRedirectEditAtom,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { EditStatusValue } from "@/app/(edit)/components/[slug]/edit/_hooks/types";
import { EditingPencil } from "@/components/icons/EditingPencil";
import { buttonVariants } from "@/components/ui/button";
import { NavigateTabsTrigger, TabsList } from "@/components/ui/tabs";
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
};

function BreadcrumbsItem({
  name,
  i,
  isPending,
  status,
}: (typeof editPaths)[number] & {
  i: number;
  isPending: boolean;
  status: EditStatusValue;
}) {
  const onRedirect = useSetAtom(onRedirectEditAtom);
  const active = status === "EDITING";

  return (
    <li>
      <div className="flex items-center ">
        {i !== 0 && (
          <ChevronRight
            className={clsx(
              "h-5 w-5 text-muted-foreground",
              isPending ? "opacity-50" : ""
            )}
          />
        )}

        <NavigateTabsTrigger
          aria-label={name}
          className={cn(
            buttonVariants({
              size: "sm",
              variant: "link",
              className:
                "mx-2 sm:mx-4 text-xs h-auto p-0 sm:text-sm font-medium relative",
            }),
            active
              ? "text-primary hover:no-underline"
              : "text-muted-foreground hover:text-primary"
          )}
          disabled={isPending}
          onClick={() => onRedirect(name)}
          value={name}
        >
          {StatusIcon[status]}
          <span className="mx-2">{name}</span>
        </NavigateTabsTrigger>
      </div>
    </li>
  );
}

export function EditBreadcrumbs() {
  const values = useAtomValue(editStatusAtom);
  const isPending =
    values.summary.status === "LOADING" || values.files.status === "LOADING";

  return (
    <TabsList className="block h-full bg-current p-0 text-transparent">
      <nav aria-label="Breadcrumb" className="flex">
        <ul className="flex items-center">
          {editPaths.map(({ name }, i) => {
            return (
              <BreadcrumbsItem
                key={name}
                i={i}
                isPending={isPending}
                name={name}
                status={values[name].status}
              />
            );
          })}
        </ul>
      </nav>
    </TabsList>
  );
}
