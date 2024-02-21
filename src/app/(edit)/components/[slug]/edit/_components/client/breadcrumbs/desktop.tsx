"use client";

/* eslint-disable no-nested-ternary */
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { CheckCircle2, CircleDashed, Loader2, Pencil } from "lucide-react";
import React, { Suspense } from "react";
import { DonNotSaveAlert } from "@/app/(edit)/components/[slug]/edit/_components/client/breadcrumbs/alert";
import {
  editPaths,
  editStatusAtom,
  isEditingAtom,
  isPendingEditAtom,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { useRedirectSection } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/section";
import {
  EditStatusValue,
  EditingSteps,
} from "@/app/(edit)/components/[slug]/edit/_hooks/types";

import { NavigateTabsTrigger } from "@/components/ui/tabs";

function Step({
  name,
  isPending,
  status,
  isEditing,
  openAlert,
  setOpenAlert,
}: {
  name: EditingSteps;
  isPending: boolean;
  status: EditStatusValue;
  isEditing: boolean;
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
}) {
  const { onRedirect, active } = useRedirectSection(name);

  return (
    <>
      <DonNotSaveAlert
        onRedirect={() => onRedirect(name)}
        open={openAlert}
        setOpenAlert={setOpenAlert}
      />
      <NavigateTabsTrigger
        aria-busy={isPending}
        aria-controls={`tabs-${name}`}
        aria-current={active ? "page" : undefined}
        aria-disabled={isPending}
        aria-label={name}
        aria-selected={active}
        className="group relative  min-w-0 flex-1 overflow-hidden rounded-none bg-background p-4 text-center text-sm font-medium capitalize text-muted-foreground focus:z-10 data-[state=active]:text-primary data-[state=active]:shadow-none"
        disabled={isPending}
        id={`tabs-${name}`}
        onClick={() => {
          if (isEditing) {
            setOpenAlert(true);
          } else {
            onRedirect(name);
          }
        }}
        role="tab"
        value={name}
      >
        {status === "CREATED" ? (
          <CheckCircle2 className="mr-2 size-6 fill-green-500 text-green-50" />
        ) : status === "EDITING" ? (
          <Pencil className="mr-2 size-6 text-primary" />
        ) : status === "LOADING" ? (
          <Loader2 className="mr-2 size-6 animate-spin text-primary" />
        ) : status === "EMPTY" ? (
          <CircleDashed className="mr-2 size-6 text-muted-foreground" />
        ) : null}
        {isPending || status === "LOADING" ? `Saving...` : name}
        <span
          aria-hidden="true"
          className={clsx(
            active ? "bg-destructive" : "bg-transparent",
            "absolute inset-x-0 bottom-0 h-0.5"
          )}
        />
      </NavigateTabsTrigger>
    </>
  );
}

function DesktopComponentBreadcrumbs() {
  const [openAlertState, setOpenAlertState] = React.useState<{
    [key in EditingSteps]: boolean;
  }>({
    summary: false,
    files: false,
    document: false,
  });

  const values = useAtomValue(editStatusAtom);
  const isPending = useAtomValue(isPendingEditAtom);
  const isEditing = useAtomValue(isEditingAtom);

  return (
    <Suspense>
      {editPaths.map(({ name }) => {
        return (
          <Step
            key={name}
            isEditing={isEditing}
            isPending={isPending}
            name={name}
            openAlert={openAlertState[name]}
            setOpenAlert={(value) =>
              setOpenAlertState((prev) => ({ ...prev, [name]: value }))
            }
            status={values[name].status}
          />
        );
      })}
    </Suspense>
  );
}

export default DesktopComponentBreadcrumbs;
