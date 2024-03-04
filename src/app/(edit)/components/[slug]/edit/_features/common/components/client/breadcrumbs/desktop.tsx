"use client";

/* eslint-disable no-nested-ternary */
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { AlertCircle, ListChecks, Loader2, PencilRuler } from "lucide-react";
import React, { Suspense } from "react";
import { DonNotSaveAlert } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/breadcrumbs/alert";
import {
  editPaths,
  editStatusAtom,
  isEditingAtom,
  isPendingEditAtom,
} from "@/app/(edit)/components/[slug]/edit/_features/section/contexts";
import { useRedirectSection } from "@/app/(edit)/components/[slug]/edit/_features/section/hooks";
import {
  EditStatusValue,
  EditingSteps,
} from "@/app/(edit)/components/[slug]/edit/_features/section/types";

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
        className="group relative min-w-0 rounded-md bg-transparent px-4 text-center text-sm capitalize text-muted-foreground hover:text-primary hover:shadow-none focus:z-10 data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-primary data-[state=active]:shadow-none"
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
          <ListChecks className="mr-2 size-5 text-success" />
        ) : status === "EDITING" ? (
          <PencilRuler className="mr-2 size-5 text-primary" />
        ) : status === "LOADING" ? (
          <Loader2 className="mr-2 size-5 animate-spin text-primary" />
        ) : status === "EMPTY" ? (
          <AlertCircle className="mr-2 size-5 text-muted-foreground group-hover:text-primary" />
        ) : null}
        {status === "LOADING" ? `Saving...` : name}
        <span
          aria-hidden="true"
          className={clsx(
            active
              ? "bg-destructive"
              : "bg-transparent group-hover:bg-destructive/30",
            "absolute inset-x-0 -bottom-3  h-0.5"
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
