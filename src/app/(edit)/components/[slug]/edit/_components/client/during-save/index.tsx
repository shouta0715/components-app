"use client";

import { Check } from "lucide-react";
import React from "react";
import { TogglePublish } from "@/app/(edit)/components/[slug]/edit/_components/client/form/draft";
import { ResetFormButton } from "@/app/(edit)/components/[slug]/edit/_components/client/form/reset";
import { StickyTrigger } from "@/app/(edit)/components/[slug]/edit/_components/client/sticky-trigger";
import { Button } from "@/components/ui/button";
import { ComponentUpdateInput } from "@/lib/schema/server/component";

function DuringComponentSave({
  draft,
  isDirty,
  handleDuringSave,
  onReset,
}: {
  draft: boolean;
  isDirty: boolean;
  handleDuringSave: (input: ComponentUpdateInput) => Promise<void>;
  onReset: () => void;
}) {
  const [publish, setPublish] = React.useState(!draft);

  const onSubmit = async () => {
    await handleDuringSave({ draft: !publish });

    setPublish(!publish);
  };

  const isChanged = isDirty || publish !== !draft;

  return (
    <StickyTrigger className="sticky top-[57px] z-20 -mx-4 -mt-8 flex items-center justify-between border-b border-border bg-background px-2.5 py-2 sm:-mx-6 md:px-4 lg:-mx-8">
      <ResetFormButton isDirty={isDirty} onReset={onReset} />
      <div className="flex w-full items-center justify-end gap-x-4">
        <div className="flex h-full items-center justify-end">
          <TogglePublish onChangePublish={setPublish} publish={publish} />
        </div>
        <div className="flex items-center justify-between">
          <Button
            className="h-auto py-2 text-xs font-semibold transition-all"
            disabled={!isChanged}
            onClick={onSubmit}
            size="sm"
            type="button"
          >
            {isDirty ? (
              "変更を保存する"
            ) : (
              <span className="flex items-center">
                <Check className="mr-1 size-4" />
                保存済み
              </span>
            )}
          </Button>
        </div>
      </div>
    </StickyTrigger>
  );
}

export default DuringComponentSave;
