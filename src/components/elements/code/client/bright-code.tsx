"use client";

/* eslint-disable react/no-array-index-key */

import { highlight } from "@code-hike/lighter";
import { BrightProps } from "bright";
import { X } from "lucide-react";
import { Suspense, memo, use, useState } from "react";
import { LangIcon } from "@/components/elements/code/common";
import { CopyButton } from "@/components/ui/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileObject } from "@/services/files/get";
import { Extension } from "@/types/file";
import { cn } from "@/utils";

type CodeProps = {
  children: string;
  lang: BrightProps["lang"];
  theme?: BrightProps["theme"];
  codeClassName?: string;
  preClassName?: string;
  className?: string;
};

type BrightCodeProps = {
  theme?: BrightProps["theme"];
  lang: Extension;
  children: string;
  wrapperClassName?: string;
} & CodeProps;

const Code = memo(
  ({
    children,
    lang,
    theme,
    codeClassName,
    preClassName,
    className,
  }: CodeProps) => {
    const {
      lines,
      style,
      lang: language,
    } = use(highlight(children, lang, theme ?? "github-dark-dimmed"));

    return (
      <div
        className={cn("text-sm min-w-full absolute overflow-auto", className)}
      >
        <pre
          className={cn("py-4", preClassName, language)}
          style={{ backgroundColor: style.background }}
        >
          <code className={cn("w-full", codeClassName)}>
            {lines.map((tokenLine, i) => (
              <div key={`line-${i}`} className="px-4">
                <span>
                  {tokenLine.map((token, j) => {
                    return (
                      <span key={`inner-line-${j}`} style={token.style}>
                        {token.content}
                      </span>
                    );
                  })}
                </span>
                {i < lines.length - 1 && "\n"}
              </div>
            ))}
          </code>
        </pre>
      </div>
    );
  }
);

function LoadingCode() {
  const code = `#include <stdio.h>\n
int main() {
    printf("loading...");
    return 0; 
}
`.trim();

  return (
    <div className="h-full bg-code p-4">
      <pre className="text-primary-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function BrightCode({ children, wrapperClassName, ...props }: BrightCodeProps) {
  return (
    <div
      className={cn(
        "relative h-code-frame w-full overflow-scroll",
        wrapperClassName
      )}
    >
      <Suspense fallback={<LoadingCode />}>
        <Code {...props}>{children}</Code>
      </Suspense>
    </div>
  );
}

export function NormalBrightCode({
  theme,
  copy = true,
  className,
  children,
  ...props
}: Omit<BrightCodeProps, "lang"> &
  Pick<BrightProps, "lang"> & {
    copy?: boolean;
  }) {
  return (
    <div className="relative">
      <Suspense fallback={<LoadingCode />}>
        <Code
          className={cn("text-sm relative", className)}
          codeClassName="pr-12"
          theme={theme ?? "github-dark-dimmed"}
          {...props}
        >
          {children}
        </Code>
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

export function MultipleBrightCode({
  objects,
  onClickDelete,
}: {
  objects: FileObject[];
  onClickDelete?: (id: string) => void;
}) {
  const [value, setValue] = useState(objects[0].id);

  return (
    <Tabs
      className="overflow-hidden rounded-md"
      defaultValue={objects[0].id}
      onValueChange={setValue}
      value={value}
    >
      <TabsList className="relative -mb-2 w-full justify-start gap-2 overflow-hidden overflow-y-scroll rounded-none  bg-code data-[state=active]:shadow-none">
        <div className="scroll-bar-hidden absolute z-10 flex w-full flex-1 overflow-scroll pr-4">
          {objects.map((object) => (
            <div key={object.id} className="relative">
              <TabsTrigger
                className="h-10 rounded-none border-b-2 border-b-transparent pr-6 text-xs text-gray-200 opacity-50 transition-none data-[state=active]:border-b-orange-700 data-[state=active]:bg-code data-[state=active]:text-primary-foreground data-[state=active]:opacity-100 data-[state=active]:shadow-none sm:text-sm dark:data-[state=active]:text-primary"
                value={object.id}
              >
                <LangIcon extension={object.extension} name={object.name} />
              </TabsTrigger>
              {onClickDelete && (
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-primary-foreground"
                  onClick={() => {
                    onClickDelete?.(object.id);
                    if (value !== object.id) return;
                    const otherFiles = objects.filter(
                      (o) => o.id !== object.id
                    );
                    if (otherFiles.length === 0) return;
                    setValue(otherFiles[0].id);
                  }}
                  type="button"
                >
                  <span className="sr-only">
                    delete {object.componentId}/${object.name}.
                    {object.extension}
                  </span>
                  <X className="size-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </TabsList>

      {objects.map((object) => (
        <TabsContent
          key={object.id}
          className="relative mt-0 bg-code"
          value={object.id}
        >
          <CopyButton
            className="absolute right-4 z-10 mx-2 my-2.5 sm:right-4"
            value={object.file}
          />
          <BrightCode lang={object.extension}>{object.file}</BrightCode>
        </TabsContent>
      ))}
    </Tabs>
  );
}
