"use client";

import { Command as CommandPrimitive } from "cmdk";
import React from "react";

export function MeComponentsCommand({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CommandPrimitive
      filter={(value, search, keywords) => {
        const extendValue = `${value} ${keywords?.join(" ")}`;
        if (extendValue.includes(search)) return 1;

        return 0;
      }}
    >
      {children}
    </CommandPrimitive>
  );
}

export const MeComponentsCommandList = CommandPrimitive.List;
export const MeComponentsCommandGroup = CommandPrimitive.Group;
export const MeComponentsCommandItem = CommandPrimitive.Item;
export const MeComponentsCommandInput = CommandPrimitive.Input;
