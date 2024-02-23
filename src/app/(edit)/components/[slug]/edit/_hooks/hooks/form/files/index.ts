import { valibotResolver } from "@hookform/resolvers/valibot";
import { useAtomValue } from "jotai";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { editValueStatesAtom } from "@/app/(edit)/components/[slug]/edit/_hooks/contexts";

import {
  EditFilesInput,
  editFilesSchema,
} from "@/lib/schema/client/edit/files";
import { Params } from "@/types/next";

export function useFilesForm(defaultValues: EditFilesInput) {
  const { files } = useAtomValue(editValueStatesAtom);
  const { slug } = useParams<Params["params"]>();

  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isDirty, defaultValues: defaultValuesForm },
    control,
  } = useForm<EditFilesInput>({
    defaultValues: files || defaultValues,
    mode: "onChange",
    resolver: valibotResolver(editFilesSchema),
  });

  const onSubmitHandler = handleSubmit(async (data) => {
    // TODO: Implement onSubmitHandler
    console.log(data);
  });

  return {
    setValue,
    getValues,
    onSubmitHandler,
    errors,
    slug,
    control,
    defaultValuesForm,
    isDirty,
  };
}
