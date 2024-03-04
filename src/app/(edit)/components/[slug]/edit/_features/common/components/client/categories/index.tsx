"use client";

import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { Control, useWatch } from "react-hook-form";
import { SelectCategories } from "@/components/elements/category/select";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EditSummaryInput } from "@/lib/schema/client/edit/summary";

type CategoryFormProps = {
  setCategory: (value: string) => void;
  control: Control<EditSummaryInput>;
};

export default function CategoryForm({
  setCategory,
  control,
}: CategoryFormProps) {
  const value = useWatch({
    control,
    name: "categoryName",
  });

  const [open, setOpen] = React.useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <div className="group inline-block">
          <Label required>UIのカテゴリーを選択</Label>
          <Button
            aria-expanded={open}
            className="mt-3 w-80 justify-between bg-background/30 capitalize group-hover:bg-accent group-hover:text-accent-foreground"
            role="combobox"
            type="button"
            variant="outline"
          >
            {value || "選択してください"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-h-80 min-h-48 w-80 overflow-auto p-0">
        <SelectCategories
          onSelected={setCategory}
          setOpen={setOpen}
          value={value}
        />
      </PopoverContent>
    </Popover>
  );
}
