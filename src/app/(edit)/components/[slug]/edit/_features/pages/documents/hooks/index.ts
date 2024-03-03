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

type OnSubmitProps = {
  data: FormEditDocumentInput;
  draft?: boolean;
};

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

  async function onSubmit({ data, draft }: OnSubmitProps) {
    await mutateAsync({ ...data, draft });
    reset(data);
    setAtomValues((prev) => ({ ...prev, document: data.document }));
  }

  // toast submit function
  const toastOnSubmit = async (data: FormEditDocumentInput) => {
    try {
      setEditStatus((prev) => ({
        ...prev,
        document: { ...prev.document, status: "LOADING" },
      }));
      await onSubmit({ data });

      setEditStatus((prev) => ({
        ...prev,
        document: { status: "EDITING", dataStatus: "CREATED" },
      }));
    } catch (e) {
      setEditStatus((prev) => ({
        ...prev,
        summary: { ...prev.summary, status: "EDITING" },
      }));

      throw e;
    }
  };

  const toastOnDuringSave = async ({ draft }: { draft?: boolean }) => {
    const data = getValues();
    const hasDocument = Boolean(data.document);

    if (hasDocument) {
      await onSubmit({ data, draft });

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

  const onSubmitHandler = handleSubmit(async (data) => {
    toast.promise(toastOnSubmit(data), {
      loading: "変更中...",
      success: "変更しました。",
      error: "変更できませんでした。",
    });
  });

  const isPending = isLoading || isSubmitting;

  return {
    errors,
    isDirty,
    control,
    isPending,
    onSubmitHandler,
    handleDuringSave,
    register,
  };
}
