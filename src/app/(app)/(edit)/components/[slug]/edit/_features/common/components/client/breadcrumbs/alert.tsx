"use client";

import React from "react";
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

export function DonNotSaveAlert({
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
