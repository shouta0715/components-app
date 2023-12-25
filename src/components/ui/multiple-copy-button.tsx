"use client";

import copy from "copy-to-clipboard";
import { Files } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Item = {
  value: string;
  label: string;
};

type MultipleCopyButtonProps = {
  items: Item[];
};

function MultipleCopyButtonItem({ value, label }: Item) {
  return (
    <DropdownMenuItem
      className="px-2 py-1 text-left text-sm hover:bg-accent"
      onClick={() => {
        copy(value);
        toast.success(`COPIED ${label.toUpperCase()} FILE!!`, {
          duration: 2000,
        });
      }}
    >
      {label}
    </DropdownMenuItem>
  );
}

export function MultipleCopyButton({ items }: MultipleCopyButtonProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Files size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="grid w-32 bg-popover">
        {items.map((item) => {
          return <MultipleCopyButtonItem key={item.value} {...item} />;
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
