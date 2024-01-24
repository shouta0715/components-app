"use client";

import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { Control, useWatch } from "react-hook-form";
import { EditSummaryInput } from "@/app/(edit)/components/[slug]/edit/_hooks/schema/summary";
import { SelectCategories } from "@/components/elements/category/select";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CategoryForm({
  setCategory,
  control,
}: {
  setCategory: (value: string) => void;
  control: Control<EditSummaryInput>;
}) {
  const value = useWatch({
    control,
    name: "categoryName",
  });

  const [open, setOpen] = React.useState(false);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <div className="group inline-block">
          <Label required>Category</Label>
          <Button
            aria-expanded={open}
            className="mt-3 w-72 justify-between capitalize group-hover:bg-accent group-hover:text-accent-foreground sm:w-80"
            role="combobox"
            type="button"
            variant="outline"
          >
            {value || "Select category"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="max-h-80 min-h-48 w-72 overflow-auto p-0 sm:w-80">
        <SelectCategories
          onSelected={setCategory}
          setOpen={setOpen}
          value={value}
        />
      </PopoverContent>
    </Popover>
  );
}
