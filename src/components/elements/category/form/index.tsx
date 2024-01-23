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
  DrawerDescription,
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
  const { register, errors, control, onSubmit } = useCategoryForm(
    defaultValue,
    onCreated
  );

  return (
    <div className="grid items-start gap-4 px-4" id="category-form">
      <div className="grid gap-2">
        <Label htmlFor="name" required>
          Name
          <InputLength
            className="ml-2"
            control={control}
            maxLength={25}
            name="name"
          />
        </Label>
        <Input
          defaultValue={defaultValue}
          id="name"
          type="text"
          {...register("name")}
        />
        {errors.name?.message && (
          <ErrorMessage className="mt-1">{errors.name?.message}</ErrorMessage>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description" required>
          Description
          <InputLength
            className="ml-2"
            control={control}
            maxLength={100}
            name="description"
          />
        </Label>
        <Textarea id="description" {...register("description")} />
        {errors.description?.message && (
          <ErrorMessage className="mt-1">
            {errors.description?.message}
          </ErrorMessage>
        )}
      </div>
      <Button
        className="w-full"
        onClick={onSubmit}
        type="button"
        variant="default"
      >
        Create Category
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
            <DialogDescription>
              新しいカテゴリを作成します。完了したら保存をクリックしてください。
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
          <DrawerDescription>
            新しいカテゴリを作成します。完了したら
            <span className="px-2 text-destructive">Create Category</span>
            をクリックしてください。
          </DrawerDescription>
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
