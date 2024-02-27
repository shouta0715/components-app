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

type AlertProps = {
  onOpenChange: (value: boolean) => void;
  open: boolean;
  onConfirm: () => void;
};

function Alert({ onOpenChange, open, onConfirm }: AlertProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            本当にリセットしますか？
          </AlertDialogTitle>
          <AlertDialogDescription>
            リッセとした場合、入力した内容が失われます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <Button
            className="font-bold"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            variant="destructive"
          >
            リセットする
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type ResetFormButtonProps = {
  onReset: () => void;
  isDirty: boolean;
  isPending: boolean;
};

export function ResetFormButton({
  onReset,
  isDirty,
  isPending,
}: ResetFormButtonProps) {
  const [alert, setAlert] = React.useState(false);

  return (
    <>
      <Alert onConfirm={onReset} onOpenChange={setAlert} open={alert} />
      <Button
        className="h-auto py-2 text-xs font-semibold transition-all"
        disabled={!isDirty || isPending}
        onClick={() => setAlert(true)}
        variant="destructive"
      >
        入力をリセット
      </Button>
    </>
  );
}