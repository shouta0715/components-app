"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { useSearchParams } from "next/navigation";
import * as React from "react";

import { useHistory } from "@/lib/next/hooks";
import { cn } from "@/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
));

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
));

export type NavigateTabsProps<T extends string> = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
  "defaultValue" | "onValueChange"
> & {
  params?: string;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  redirectType?: "replace" | "push" | "manual";
};

const NavigateTabs = <T extends string = string>({
  className,
  params = "tab",
  defaultValue,
  onValueChange,
  redirectType = "replace",
  ...props
}: NavigateTabsProps<T>) => {
  const searchParams = useSearchParams();
  const { replace, push } = useHistory();
  const defaultTab = searchParams.get(params) ?? defaultValue;

  return (
    <TabsPrimitive.Root
      className={className}
      defaultValue={defaultTab}
      onValueChange={(value) => {
        if (redirectType === "replace") replace({ [params]: value });
        else if (redirectType === "push") push({ [params]: value });

        onValueChange?.(value as T);
      }}
      {...props}
    />
  );
};

export type NavigateTabsTriggerProps<T extends string> = Omit<
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
  "value"
> & {
  value: T;
};

const NavigateTabsTrigger = <T extends string = string>({
  className,
  value,
  children,
  ...props
}: NavigateTabsTriggerProps<T>) => {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      value={value}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
};

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));

export {
  NavigateTabs,
  NavigateTabsTrigger,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tabs,
};
