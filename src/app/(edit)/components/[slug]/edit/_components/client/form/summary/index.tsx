"use client";

import { valibotResolver } from "@hookform/resolvers/valibot";
import React from "react";
import { useForm } from "react-hook-form";

import {
  EditSummaryInput,
  editSummarySchema,
} from "@/app/(edit)/components/[slug]/edit/_hooks/schema/summary";
import { ErrorMessage } from "@/components/ui/error-message";
import { InputLength } from "@/components/ui/input-length";
import { Label } from "@/components/ui/label";
import { AutoSizeTextarea, Textarea } from "@/components/ui/textarea";

type EditSummaryFormProps = {
  defaultValues: EditSummaryInput;
};

export function EditSummaryForm({ defaultValues }: EditSummaryFormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<EditSummaryInput>({
    defaultValues,
    mode: "onChange",
    resolver: valibotResolver(editSummarySchema),
  });

  return (
    <form className="flex flex-col gap-8">
      <fieldset className=" grid gap-3 ">
        <Label htmlFor="name" required>
          Name
          <InputLength
            className="mx-2"
            control={control}
            maxLength={50}
            name="name"
          />
        </Label>
        <div className="mb-px border-b py-3 focus-within:mb-0 focus-within:border-b-2 focus-within:border-b-primary">
          <AutoSizeTextarea
            className="flex h-7 w-full resize-none items-center bg-background text-xl placeholder:text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue={defaultValues.name}
            placeholder="Untitled Component"
            {...register("name")}
            maxRows={4}
            minRows={1}
          />
        </div>
        {errors.name?.message && (
          <ErrorMessage className="mt-1">{errors.name?.message}</ErrorMessage>
        )}
      </fieldset>
      <fieldset className="grid gap-3">
        <Label htmlFor="description">
          Description
          <InputLength
            className="mx-2"
            control={control}
            maxLength={200}
            name="description"
          />
        </Label>
        <Textarea
          className="min-h-32"
          defaultValue={defaultValues.description ?? ""}
          id="description"
          placeholder="description"
          {...register("description")}
        />
        {errors.description?.message && (
          <ErrorMessage className="mt-1">
            {errors.description?.message}
          </ErrorMessage>
        )}
      </fieldset>
    </form>
  );
}
