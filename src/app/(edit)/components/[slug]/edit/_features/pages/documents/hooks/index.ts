import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { useMutateComponent } from "@/app/(edit)/components/[slug]/edit/_features/pages/summary/api";
import {
  editStatusAtom,
  editValueStatesAtom,
} from "@/app/(edit)/components/[slug]/edit/_features/section/contexts";
import {
  EditDocumentInput,
  FormEditDocumentInput,
  formEditDocumentSchema,
} from "@/lib/schema/client/edit/document";
import { Params } from "@/types/next";

export function useDocumentForm(defaultValues: EditDocumentInput) {
  const { document } = useAtomValue(editValueStatesAtom);
  const { slug } = useParams<Params["params"]>();

  const setEditStatus = useSetAtom(editStatusAtom);
  const setAtomValues = useSetAtom(editValueStatesAtom);

  const { mutateAsync, isPending: isSubmitting } = useMutateComponent(slug);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors, isDirty, isLoading },
  } = useForm<FormEditDocumentInput>({
    defaultValues: { document: document ?? defaultValues },
    resolver: valibotResolver(formEditDocumentSchema),
  });

  async function onSubmit(values: FormEditDocumentInput, draft?: boolean) {
    await mutateAsync({ ...values, draft });
    reset(values);
    setAtomValues((prev) => ({ ...prev, document: values.document }));
  }

  async function handleDuringSave({ draft }: { draft?: boolean }) {
    const data = getValues();
    const hasDocument = Boolean(data.document);

    if (hasDocument) {
      await onSubmit(data, draft);

      return;
    }

    toast.error(`変更するには、ドキュメントを入力してください。`);
  }

  const onSubmitHandler = handleSubmit(async (values) => {
    setEditStatus((prev) => ({
      ...prev,
      document: { ...prev.document, status: "LOADING" },
    }));
    try {
      await onSubmit(values);

      setEditStatus((prev) => ({
        ...prev,
        document: { status: "EDITING", dataStatus: "CREATED" },
      }));
    } catch {
      setEditStatus((prev) => ({
        ...prev,
        summary: { ...prev.summary, status: "EDITING" },
      }));
    }
  });

  const isPending = isLoading || isSubmitting;

  return {
    errors,
    isDirty,
    control,
    isPending,
    onSubmitHandler,
    handleDuringSave,
    reset,
    register,
  };
}
