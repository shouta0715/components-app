"server only";

import { Menu } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LeftSide } from "@/layouts/root/left";

export function NavSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button size="icon" variant="ghost">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent className="grid gap-4" side="left">
        <h2 className="flex items-center gap-4 ">
          <img
            alt="Your Company"
            className="h-6 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          />
          <span className="inline-block text-lg font-bold">UI TRADE</span>
        </h2>
        <LeftSide />
      </SheetContent>
    </Sheet>
  );
}
