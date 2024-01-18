"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { usePathname, useSearchParams } from "next/navigation";
import * as React from "react";

import { cn } from "@/utils";

const NavigateParamContext = React.createContext<string>("tab");

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

const NavigateTabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    params?: string;
  }
>(({ className, params = "tab", defaultValue, ...props }, ref) => {
  const searchParams = useSearchParams();

  const defaultTab = searchParams.get(params) ?? defaultValue;

  return (
    <NavigateParamContext.Provider value={params}>
      <TabsPrimitive.Root
        ref={ref}
        className={className}
        defaultValue={defaultTab}
        {...props}
      />
    </NavigateParamContext.Provider>
  );
});

const NavigateTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, value, children, onClick, ...props }, ref) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = React.useContext(NavigateParamContext);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
      onClick={(e) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set(params, value);
        window.history.replaceState(
          null,
          "",
          `${pathname}?${newParams.toString()}`
        );
        onClick?.(e);
      }}
      value={value}
      {...props}
      aria-selected={searchParams.get(params) === value}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
});

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
