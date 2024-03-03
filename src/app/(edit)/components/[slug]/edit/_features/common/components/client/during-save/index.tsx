"use client";

import { Check } from "lucide-react";
import React from "react";
import { TogglePublish } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/draft";
import { StickyTrigger } from "@/app/(edit)/components/[slug]/edit/_features/common/components/client/sticky-trigger";
import { Button } from "@/components/ui/button";
import { ComponentUpdateInput } from "@/lib/schema/server/component";

type DuringComponentSaveProps = {
  draft: boolean;
  isDirty: boolean;
  isPending: boolean;
  handleDuringSave: (
    input: Pick<ComponentUpdateInput, "draft">
  ) => Promise<void>;
};

function DuringComponentSave({
  draft,
  isDirty,
  isPending,
  handleDuringSave,
}: DuringComponentSaveProps) {
  const [publish, setPublish] = React.useState(!draft);

  const onSubmit = async () => {
    await handleDuringSave({ draft: !publish });
  };

  const isChanged = isDirty || publish !== !draft;

  return (
    <StickyTrigger className="sticky top-[57px] z-20 -mx-4 -mt-8 flex items-center justify-between border-b border-border bg-background px-2.5 py-2 sm:-mx-6 md:px-4 lg:-mx-8">
      <div className="flex w-full items-center justify-end gap-x-4">
        <div className="flex h-full items-center justify-end">
          <TogglePublish onChangePublish={setPublish} publish={publish} />
        </div>
        <div className="flex items-center justify-between">
          <Button
            className="h-auto w-28 py-2 text-xs font-semibold transition-all"
            disabled={!isChanged || isPending}
            onClick={onSubmit}
            size="sm"
            type="button"
          >
            {isChanged ? (
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
