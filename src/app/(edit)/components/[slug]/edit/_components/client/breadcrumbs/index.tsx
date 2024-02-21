/* eslint-disable no-nested-ternary */

"use client";

import clsx from "clsx";
import { useAtomValue } from "jotai";
import { CheckCircle2, CircleDashed, Loader2, Pencil } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import {
  editPaths,
  editStatusAtom,
  isEditingAtom,
  isPendingEditAtom,
} from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";
import {
  useRedirectSection,
  useRedirectSectionHandler,
} from "@/app/(edit)/components/[slug]/edit/_hooks/hooks/section";
import {
  EditStatus,
  EditStatusValue,
  EditingSteps,
} from "@/app/(edit)/components/[slug]/edit/_hooks/types";

import {
  getNextEditingStep,
  paramsToEditingStep,
} from "@/app/(edit)/components/[slug]/edit/_hooks/utils";
import { useMediaQuery } from "@/components/elements/category/form/useCategoryForm";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NavigateTabsTrigger } from "@/components/ui/tabs";

function Alert({
  onRedirect,
  setOpenAlert,
  open,
}: {
  setOpenAlert: (value: boolean) => void;
  open: boolean;
  onRedirect: () => void;
}) {
  return (
    <AlertDialog onOpenChange={setOpenAlert} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            保存していない内容があります。本当に移動しますか？
          </AlertDialogTitle>
          <AlertDialogDescription>
            このまま移動すると、保存していない内容が失われます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <Button
            className="font-bold"
            onClick={() => {
              onRedirect();
              setOpenAlert(false);
            }}
            variant="destructive"
          >
            移動する
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Step({
  name,
  isPending,
  status,
  isEditing,
}: {
  name: EditingSteps;
  isPending: boolean;
  status: EditStatusValue;
  isEditing: boolean;
}) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const { onRedirect, active } = useRedirectSection(name);

  return (
    <>
      <Alert
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
          <Loader2 className="mr-2 size-6 text-primary" />
        ) : status === "EMPTY" ? (
          <CircleDashed className="mr-2 size-6 text-muted-foreground" />
        ) : null}
        {name}
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

function SelectStep({
  name,
  isPending,
  status,
  active,
}: {
  name: EditingSteps;
  isPending: boolean;
  status: EditStatusValue;
  active: boolean;
}) {
  return (
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
          {name}
        </span>
      </span>
    </SelectItem>
  );
}

function SelectStepper({
  isEditing,
  isPending,
  values,
}: {
  isEditing: boolean;
  isPending: boolean;
  values: EditStatus;
}) {
  const [openAlert, setOpenAlert] = React.useState(false);
  const { onRedirect } = useRedirectSectionHandler();
  const searchParams = useSearchParams();
  const currentSection = paramsToEditingStep(searchParams.get("section"));
  const nextSection = getNextEditingStep(currentSection);

  return (
    <>
      <Alert
        onRedirect={() =>
          onRedirect(nextSection === "preview" ? "document" : nextSection)
        }
        open={openAlert}
        setOpenAlert={setOpenAlert}
      />
      <Select
        defaultValue={currentSection}
        onValueChange={(value: EditingSteps) => {
          if (isEditing) {
            setOpenAlert(true);
          } else {
            onRedirect(value);
          }
        }}
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
                  status={values[name].status}
                />
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

function EditSteps() {
  const values = useAtomValue(editStatusAtom);
  const isPending = useAtomValue(isPendingEditAtom);
  const isEditing = useAtomValue(isEditingAtom);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <div className="h-full flex-1">
      <nav className="flex">
        {isDesktop ? (
          <div className="hidden flex-1 grid-cols-3 divide-x divide-border sm:grid">
            <Suspense>
              {editPaths.map(({ name }) => {
                return (
                  <Step
                    key={name}
                    isEditing={isEditing}
                    isPending={isPending}
                    name={name}
                    status={values[name].status}
                  />
                );
              })}
            </Suspense>
          </div>
        ) : (
          <div className="flex-1 py-2 sm:hidden">
            <Suspense>
              <SelectStepper
                isEditing={isEditing}
                isPending={isPending}
                values={values}
              />
            </Suspense>
          </div>
        )}
      </nav>
    </div>
  );
}

export default EditSteps;
