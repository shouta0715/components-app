"use client";

import copy from "copy-to-clipboard";
import { Files } from "lucide-react";
import React, { useCallback, useEffect, useId, useState } from "react";
import { toast } from "sonner";

type Item = {
  value: string;
  label: string;
};

type MultipleCopyButtonProps = {
  items: Item[];
};

function MultipleCopyButtonItem({
  value,
  label,
  setOpen,
}: Item & { setOpen: (open: boolean) => void }) {
  return (
    <button
      className="px-2 py-1 text-left text-sm hover:bg-accent"
      onClick={() => {
        copy(value);
        toast.success(`COPIED ${label.toUpperCase()} FILE!!`, {
          duration: 2000,
        });
        setOpen(false);
      }}
      role="menuitem"
      tabIndex={-1}
      type="button"
    >
      {label}
    </button>
  );
}

export function MultipleCopyButton({ items }: MultipleCopyButtonProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const onOutSideClick = useCallback(
    (event: MouseEvent) => {
      if (!open) return;
      const target = event.target as HTMLElement;

      if (!target.closest("#pop-wrapper")) setOpen(false);
    },
    [open]
  );

  useEffect(() => {
    window.addEventListener("mousedown", onOutSideClick);

    return () => window.removeEventListener("mousedown", onOutSideClick);
  }, [onOutSideClick]);

  return (
    <div className="relative" id="pop-wrapper">
      <button
        aria-controls={id}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Open Copy File Menu"
        id={id}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <Files size={16} />
        <span className="sr-only">Open Copy File Menu</span>
      </button>
      <div
        aria-hidden={!open ? true : undefined}
        className={`absolute right-0 z-20 grid w-32 rounded-md border border-input bg-popover p-2 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        id={id}
        role="menu"
      >
        {items.map((item) => {
          return (
            <MultipleCopyButtonItem
              key={item.value}
              setOpen={setOpen}
              {...item}
            />
          );
        })}
      </div>
    </div>
  );
}
