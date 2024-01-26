/* eslint-disable no-nested-ternary */

"use client";

import clsx from "clsx";
import { useAtomValue } from "jotai";
import { Check, Loader2 } from "lucide-react";
import React from "react";
import {
  editPaths,
  editStatusAtom,
  isPendingEditAtom,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { useRedirectSection } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/section";
import { EditStatusValue } from "@/app/(edit)/components/[slug]/edit/_hooks/types";

import { NavigateTabsTrigger } from "@/components/ui/tabs";

function Step({
  name,
  i,
  isPending,
  status,
}: (typeof editPaths)[number] & {
  i: number;
  isPending: boolean;
  status: EditStatusValue;
}) {
  const { onRedirect, active } = useRedirectSection(name);

  return (
    <>
      <NavigateTabsTrigger
        aria-busy={isPending}
        aria-controls={`tabs-${name}`}
        aria-current={active ? "page" : undefined}
        aria-disabled={isPending}
        aria-label={name}
        aria-selected={active}
        className="group relative h-auto whitespace-normal p-0 font-medium text-primary data-[state=active]:shadow-none"
        disabled={isPending}
        id={`tabs-${name}`}
        onClick={() => onRedirect(name)}
        role="tab"
        value={name}
      >
        <span className="flex items-center p-2 text-sm font-medium sm:px-4">
          {status === "CREATED" ? (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-500 text-white sm:size-9 dark:bg-green-600 ">
              <Check className="hidden sm:block" />
              <span className="sm:hidden">
                {name.slice(0, 1).toUpperCase()}
              </span>
            </span>
          ) : status === "LOADING" ? (
            <span className="flex size-7 shrink-0 animate-spin items-center justify-center rounded-full sm:size-9 ">
              <Loader2 className="text-primary" />
              <span className="sr-only">{name}を読み込み中</span>
            </span>
          ) : status === "EDITING" ? (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-primary sm:size-9">
              <span className="text-xs text-primary sm:text-sm">
                {name.slice(0, 1).toUpperCase()}
              </span>
            </span>
          ) : status === "EMPTY" ? (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-border group-hover:border-primary sm:size-9">
              <span className="text-xs text-muted-foreground group-hover:text-primary sm:text-sm">
                {name.slice(0, 1).toUpperCase()}
              </span>
            </span>
          ) : null}

          <span
            className={clsx(
              "ml-1 text-sm font-medium capitalize sm:ml-2.5 md:ml-4",
              active
                ? "block text-primary"
                : "hidden text-muted-foreground group-hover:text-primary sm:block",
              isPending ? "text-muted-foreground" : ""
            )}
          >
            {isPending && active ? "Saving..." : name}
          </span>
        </span>
      </NavigateTabsTrigger>
      {i !== editPaths.length - 1 && (
        <svg
          aria-hidden="true"
          className="h-full w-2 shrink-0 text-gray-300 sm:w-6"
          fill="currentColor"
          preserveAspectRatio="none"
          viewBox="0 0 24 44"
        >
          <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
        </svg>
      )}
    </>
  );
}

export function EditSteps() {
  const values = useAtomValue(editStatusAtom);
  const isPending = useAtomValue(isPendingEditAtom);

  return (
    <div className="h-full flex-1">
      <nav className="flex">
        <div className="flex h-auto items-center bg-current p-0 text-transparent">
          {editPaths.map(({ name }, i) => {
            return (
              <Step
                key={name}
                i={i}
                isPending={isPending}
                name={name}
                status={values[name].status}
              />
            );
          })}
        </div>
      </nav>
    </div>
  );
}
