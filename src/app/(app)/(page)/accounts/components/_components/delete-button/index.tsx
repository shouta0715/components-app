"use client";

import { useMutation, useMutationState } from "@tanstack/react-query";
import { Ellipsis, Loader2Icon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { throwHttpErrorFromStatus } from "@/lib/errors";

async function onDelete(id: string) {
  const res = await fetch(`/api/components/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throwHttpErrorFromStatus(res.status);
}

export function DeleteComponentButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["component-delete", id],
    mutationFn: onDelete,
    onSuccess: () => {
      router.refresh();
      setOpen(false);
    },
  });

  const data = useMutationState({
    filters: { mutationKey: ["component-delete"], status: "pending" },
  });

  const hasMutation = data?.length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (hasMutation) return;
    e.preventDefault();
    toast.promise(mutateAsync(id), {
      loading: "削除中...",
      success: "削除しました。",
      error: "削除できませんでした。再度お試しください。",
    });
  };

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger>
        <Ellipsis className="ml-4 size-6" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-40 p-0">
        <Dialog
          onOpenChange={(o) => {
            if (!o) setOpen(false);
          }}
        >
          <DialogTrigger className="flex w-full  items-center px-4 py-3 text-sm hover:bg-accent">
            <Trash className="mr-2 size-4 text-destructive" />
            <span className="text-destructive">削除する</span>
          </DialogTrigger>
          <DialogContent className="block">
            <DialogHeader className="space-y-4">
              <DialogTitle className="text-destructive">
                本当に削除しますか？
              </DialogTitle>

              <DialogDescription>
                <span className="line-clamp-1 inline pr-2 font-semibold text-primary">
                  {name || "Untitled"}
                </span>
                を削除しようとしています。
                この操作を実行すると、このコンポーネントは完全に削除されます。
                投稿に紐づくファイルは30日後に削除されます。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex justify-between sm:justify-between">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  キャンセル
                </Button>
              </DialogClose>
              <form onSubmit={handleSubmit}>
                <Button
                  disabled={isPending || hasMutation}
                  type="submit"
                  variant="destructive"
                >
                  {(isPending || hasMutation) && (
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                  )}
                  削除する
                </Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  );
}
