import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { useMutateComponent } from "@/app/(app)/(edit)/components/[slug]/edit/_features/pages/summary/api";
import {
  editStatusAtom,
  editValueStatesAtom,
  isEditingAtom,
} from "@/app/(app)/(edit)/components/[slug]/edit/_features/section/contexts";
import {
  EditDocumentInput,
  FormEditDocumentInput,
  formEditDocumentSchema,
} from "@/lib/schema/client/edit/document";
import { Params } from "@/types/next";

type OnSubmitProps = {
  data: FormEditDocumentInput;
  draft?: boolean;
};

export function useDocumentForm(defaultValues: EditDocumentInput) {
  const { document } = useAtomValue(editValueStatesAtom);
  const { slug } = useParams<Params["params"]>();

  const setIsEditing = useSetAtom(isEditingAtom);
  const setEditStatus = useSetAtom(editStatusAtom);
  const setAtomValues = useSetAtom(editValueStatesAtom);

  const { mutateAsync, isPending: isSubmitting } = useMutateComponent(slug);

  const {
    setValue,
    reset,
    getValues,
    control,
    formState: { errors, isDirty, isLoading },
  } = useForm<FormEditDocumentInput>({
    defaultValues: { document: document ?? defaultValues },
    resolver: valibotResolver(formEditDocumentSchema),
  });

  useEffect(() => {
    setIsEditing(isDirty);

    return () => setIsEditing(false);
  }, [isDirty, setIsEditing]);

  async function onSubmit({ data, draft }: OnSubmitProps) {
    await mutateAsync({ ...data, draft });
    reset(data);
    setAtomValues((prev) => ({ ...prev, document: data.document }));
  }

  const toastOnDuringSave = async ({ draft }: { draft?: boolean }) => {
    const data = getValues();
    const hasDocument = Boolean(data.document);

    if (hasDocument) {
      setEditStatus((prev) => ({
        ...prev,
        document: { ...prev.document, status: "LOADING" },
      }));
      await onSubmit({ data, draft });

      setEditStatus((prev) => ({
        ...prev,
        document: { status: "EDITING", dataStatus: "CREATED" },
      }));

      return;
    }

    const e = new Error(`変更するには、ドキュメントを入力してください。`);

    throw e;
  };

  async function handleDuringSave({ draft }: { draft?: boolean }) {
    toast.promise(toastOnDuringSave({ draft }), {
      loading: "変更中...",
      success: "変更しました。",
      error: (e) => e.message,
    });
  }

  const isPending = isLoading || isSubmitting;

  return {
    errors,
    isDirty,
    control,
    isPending,
    handleDuringSave,
    setValue,
    reset,
    getValues,
  };
}
