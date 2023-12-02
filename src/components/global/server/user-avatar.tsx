import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const solutions = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure",
    href: "#",
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
  },
];

export async function UserAvatar() {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="h-8 w-8 md:h-10 md:w-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="flex w-52 flex-col gap-y-2"
        sideOffset={4}
      >
        {solutions.map((item) => (
          <a
            key={item.name}
            className="block p-2 hover:text-indigo-600"
            href={item.href}
          >
            {item.name}
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}
