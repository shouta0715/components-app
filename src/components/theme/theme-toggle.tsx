"use client";

import clsx from "clsx";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-8 w-8 md:h-10 md:w-10 "
          radius="full"
          size="icon"
          variant="outline"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 md:h-5 md:w-5" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 md:h-5 md:w-5" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <div className="flex items-center">
            <div className="flex h-6 w-6 flex-none items-center justify-center rounded-md bg-white shadow ring-1 ring-slate-900/10 dark:text-background">
              <Sun
                className={clsx(
                  "h-4 w-4 ",
                  theme === "light"
                    ? "fill-cyan-500 stroke-cyan-500"
                    : "stroke-slate-400"
                )}
              />
            </div>
            <span className="ml-3">Light</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <div className="flex items-center">
            <div className="flex h-6 w-6 flex-none items-center justify-center rounded-md bg-white shadow ring-1 ring-slate-900/10 dark:text-background">
              <Moon
                className={clsx(
                  "h-4 w-4 ",
                  theme === "dark"
                    ? "fill-cyan-500 stroke-cyan-500"
                    : "stroke-slate-400"
                )}
              />
            </div>
            <span className="ml-3">Dark</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <div className="flex items-center">
            <div className="flex h-6 w-6 flex-none items-center justify-center rounded-md bg-white shadow ring-1 ring-slate-900/10 dark:text-background">
              <Monitor
                className={clsx(
                  "h-4 w-4 ",
                  theme === "system" ? " stroke-cyan-500" : "stroke-slate-400"
                )}
              />
            </div>
            <span className="ml-3">System</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
