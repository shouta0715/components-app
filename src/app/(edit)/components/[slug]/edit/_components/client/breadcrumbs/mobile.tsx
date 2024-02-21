"use client";

/* eslint-disable no-nested-ternary */
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { CheckCircle2, CircleDashed, Loader2, Pencil } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { DonNotSaveAlert } from "@/app/(edit)/components/[slug]/edit/_components/client/breadcrumbs/alert";
import {
  editPaths,
  editStatusAtom,
  isEditingAtom,
  isPendingEditAtom,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import { useRedirectSectionHandler } from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/section";
import {
  EditStatusValue,
  EditingSteps,
} from "@/app/(edit)/components/[slug]/edit/_hooks/types";
import { paramsToEditingStep } from "@/app/(edit)/components/[slug]/edit/_hooks/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SelectStep({
  name,
  isPending,
  status,
  active,
  setOpenAlert,
  openAlert,
}: {
  name: EditingSteps;
  isPending: boolean;
  status: EditStatusValue;
  active: boolean;
  setOpenAlert: (value: boolean) => void;
  openAlert: boolean;
}) {
  const { onRedirect } = useRedirectSectionHandler();

  return (
    <>
      <DonNotSaveAlert
        onRedirect={() => onRedirect(name)}
        open={openAlert}
        setOpenAlert={setOpenAlert}
      />
      <SelectItem className="w-full flex-1" disabled={isPending} value={name}>
        <span className="flex items-center">
          {status === "CREATED" ? (
            <CheckCircle2 className="mr-2 size-6 fill-green-500 text-green-50" />
          ) : status === "EDITING" ? (
            <Pencil className="mr-2 size-6 text-primary" />
          ) : status === "LOADING" ? (
            <Loader2 className="mr-2 size-6 text-primary" />
          ) : status === "EMPTY" ? (
            <CircleDashed className="mr-2 size-6 text-muted-foreground" />
          ) : null}
          <span
            className={clsx(
              "capitalize",
              active ? " font-semibold text-primary" : "text-muted-foreground"
            )}
          >
            {isPending || status === "LOADING" ? `Saving...` : name}
          </span>
        </span>
      </SelectItem>
    </>
  );
}

function MobileComponentBreadcrumbs() {
  // Alert
  const [openAlertState, setOpenAlertState] = React.useState<{
    [key in EditingSteps]: boolean;
  }>({
    summary: false,
    files: false,
    document: false,
  });

  // sections
  const { onRedirect } = useRedirectSectionHandler();
  const searchParams = useSearchParams();
  const currentSection = paramsToEditingStep(searchParams.get("section"));

  // atoms
  const values = useAtomValue(editStatusAtom);
  const isPending = useAtomValue(isPendingEditAtom);
  const isEditing = useAtomValue(isEditingAtom);

  return (
    <Select
      defaultValue={currentSection}
      onValueChange={(value: EditingSteps) => {
        if (isEditing) {
          setOpenAlertState((prev) => ({ ...prev, [value]: true }));
        } else {
          onRedirect(value);
        }
      }}
      value={currentSection}
    >
      <SelectTrigger className="flex rounded-none border-none capitalize focus:ring-0 [&_span]:flex-1">
        <SelectValue
          className="flex flex-1 text-primary"
          placeholder="選択してください"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>編集する内容を選択してください</SelectLabel>

          {editPaths.map(({ name }) => {
            return (
              <SelectStep
                key={name}
                active={currentSection === name}
                isPending={isPending}
                name={name}
                openAlert={openAlertState[name]}
                setOpenAlert={(value) => {
                  setOpenAlertState((prev) => ({ ...prev, [name]: value }));
                }}
                status={values[name].status}
              />
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default MobileComponentBreadcrumbs;
