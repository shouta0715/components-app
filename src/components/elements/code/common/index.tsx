import { Suspense } from "react";
import { BuiltinLanguage } from "shiki";

import {
  ShikiCode,
  ShikiCodeProps,
  ShikiLoading,
} from "@/components/elements/code/common/shiki";
import { LangIcons } from "@/components/icons/LangIcons";
import { CopyButton } from "@/components/ui/copy-button";
import { Extension } from "@/types/file";
import { cn } from "@/utils";

export function LangIcon({
  extension,
  name,
}: {
  extension: Extension;
  name: string;
}) {
  const Icon = LangIcons[extension];

  return (
    <div className="flex items-center">
      <Icon className="mr-2 mt-0.5 h-4 w-4" />
      <span>
        {name}.{extension}
      </span>
    </div>
  );
}

export type SyntaxCodeProps = {
  lang: BuiltinLanguage;
  children: string;
  wrapperClassName?: string;
  copy?: boolean;
} & ShikiCodeProps;

export function SyntaxCode({
  copy = true,
  className,
  children,
  ...props
}: SyntaxCodeProps) {
  return (
    <div className="relative">
      <Suspense fallback={<ShikiLoading />}>
        <ShikiCode className={cn("text-sm relative", className)} {...props}>
          {children}
        </ShikiCode>
      </Suspense>
      {copy && (
        <div className="pointer-events-none absolute inset-0 flex  h-12  w-full">
          <CopyButton
            className="pointer-events-auto my-auto ml-auto mr-4"
            value={children}
          />
        </div>
      )}
    </div>
  );
}
