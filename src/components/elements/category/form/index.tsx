import { Loader2 } from "lucide-react";
import * as React from "react";

import {
  useCategoryForm,
  useMediaQuery,
} from "@/components/elements/category/form/useCategoryForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input } from "@/components/ui/input";
import { InputLength } from "@/components/ui/input-length";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CategoryFormProps = {
  onCreated: (value: string) => void;
  defaultValue: string;
};

function CategoryForm({
  defaultValue,
  onCreated,
}: CategoryFormProps & { className?: string }) {
  const { register, errors, control, onSubmit, isPending } = useCategoryForm(
    defaultValue,
    onCreated
  );

  return (
    <div className="grid items-start gap-4 px-4" id="category-form">
      <div className="grid gap-2">
        <Label htmlFor="name" required>
          カテゴリーの名前
          <InputLength
            className="ml-2"
            control={control}
            maxLength={25}
            name="name"
          />
        </Label>
        <Input
          className="placeholder:text-sm"
          defaultValue={defaultValue}
          id="name"
          placeholder="カテゴリー名を入力..."
          type="text"
          {...register("name")}
        />
        {errors.name?.message && (
          <ErrorMessage className="mt-1">{errors.name?.message}</ErrorMessage>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description" required>
          カテゴリーの説明
          <InputLength
            className="ml-2"
            control={control}
            maxLength={100}
            name="description"
          />
        </Label>
        <Textarea
          className="placeholder:pt-0.5 placeholder:text-sm"
          id="description"
          placeholder="カテゴリーの説明を入力..."
          {...register("description")}
        />
        {errors.description?.message && (
          <ErrorMessage className="mt-1">
            {errors.description?.message}
          </ErrorMessage>
        )}
      </div>
      <Button
        className="w-full font-semibold"
        disabled={isPending}
        onClick={onSubmit}
        type="button"
        variant="default"
      >
        {isPending ? (
          <span className="flex items-center justify-center">
            <Loader2 className="size-4 animate-spin" />
            作成中...
          </span>
        ) : (
          "作成する"
        )}
      </Button>
    </div>
  );
}

export function CategoryFormDialog({
  defaultValue,
  onCreated,
}: CategoryFormProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const title = "Create a New Category";

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center" variant="default">
            <span className="mx-2 line-clamp-1 max-w-44 flex-1">
              {defaultValue}
            </span>
            <span>を作成する</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="pt-2 text-xs">
              新しいカテゴリを作成します。項目を入力後、作成するをクリックしてください。
            </DialogDescription>
          </DialogHeader>
          <CategoryForm defaultValue={defaultValue} onCreated={onCreated} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="flex items-center" variant="default">
          <span className="mx-2 line-clamp-1 max-w-44 flex-1">
            {defaultValue}
          </span>
          <span>を作成する</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="pt-2 text-xs">
            新しいカテゴリを作成します。項目を入力後、作成するをクリックしてください。
          </DialogDescription>
        </DrawerHeader>
        <CategoryForm defaultValue={defaultValue} onCreated={onCreated} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
