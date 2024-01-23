import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategoryInput, categorySchema } from "@/lib/schema/server/category";

const getMatches = (query: string): boolean => {
  if (typeof window !== "undefined") {
    return window.matchMedia(query).matches;
  }

  return false;
};

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    function handleChange() {
      setMatches(getMatches(query));
    }

    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

async function createCategory(input: CategoryInput) {
  const res = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = (await res.json()) as { category: { name: string } };

  return data;
}

export function useCategoryForm(
  defaultValue: string,
  onCreated: (value: string) => void,
  onError?: (err: unknown, data: CategoryInput) => void
) {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: createCategory,
    onError: (err, data) => {
      toast.error(`${data.name}を作成できませんでした。`, {
        description: "通信環境が良いところで再度お試しください。",
      });
      onError?.(err, data);
    },
    onSuccess: ({ category }) => {
      queryClient.refetchQueries({
        queryKey: ["categories", "search", { q: category.name }],
        exact: true,
      });
      toast.success(`${category.name}を作成しました。`);
      onCreated(category.name);
    },
  });

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<CategoryInput>({
    resolver: valibotResolver(categorySchema),
    defaultValues: {
      name: defaultValue,
      description: "",
    },
    mode: "onChange",
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  return {
    register,
    errors,
    control,
    onSubmit,
    isPending,
  };
}
