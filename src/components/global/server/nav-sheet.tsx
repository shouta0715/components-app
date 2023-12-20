"server only";

import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Icon } from "@/components/icons/Icon";
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
        <SheetTrigger asChild>
          <Link href="/">
            <h2 className="flex items-center gap-4 ">
              <Icon className="h-6 w-auto" />
              <span className="inline-block text-lg font-bold">UI TRADE</span>
            </h2>
          </Link>
        </SheetTrigger>
        <LeftSide />
      </SheetContent>
    </Sheet>
  );
}
