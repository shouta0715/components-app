"use client";

import { useAtom, useAtomValue } from "jotai";
import { Check } from "lucide-react";
import React, { useState } from "react";
import { TogglePublish } from "@/app/(app)/(edit)/components/[slug]/edit/_features/common/components/client/draft";
import {
  editValueStatesAtom,
  initialDraftAtom,
} from "@/app/(app)/(edit)/components/[slug]/edit/_features/section/contexts";
import { Button } from "@/components/ui/button";
import { ComponentUpdateInput } from "@/lib/schema/server/component";

type DuringComponentSaveProps = {
  isDirty: boolean;
  isPending: boolean;
  name: string;
  handleDuringSave: (
    input: Pick<ComponentUpdateInput, "draft">
  ) => Promise<void>;
};

function DuringComponentSave({
  isDirty,
  isPending,
  name,
  handleDuringSave,
}: DuringComponentSaveProps) {
  const [initialDraft, setInitialDraft] = useAtom(initialDraftAtom);
  const [draft, setDraft] = useState(initialDraft);
  const { summary } = useAtomValue(editValueStatesAtom);

  const onSubmit = async () => {
    await handleDuringSave({ draft });

    setDraft(draft);
    setInitialDraft(draft);
  };

  const isChanged = isDirty || draft !== initialDraft;

  return (
    <div className="sticky top-[57px] z-20 -mx-4 -mt-8 flex items-center justify-between border-b border-border bg-background/90 px-2.5 py-2 sm:-mx-6 md:px-4 lg:-mx-8">
      <div className="mr-4 line-clamp-1 flex-1 items-center text-sm font-medium">
        {summary?.name || name || "編集中..."}
      </div>
      <div className="flex items-center gap-x-4">
        <div className="flex h-full items-center justify-end">
          <TogglePublish onChangePublish={setDraft} publish={draft} />
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
    </div>
  );
}

export default DuringComponentSave;
