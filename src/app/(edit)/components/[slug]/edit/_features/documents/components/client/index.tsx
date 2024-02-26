"use client";

import React from "react";
import { useForm } from "react-hook-form";

export function EditDocumentForm() {
  const { register } = useForm();

  return (
    <div>
      <input {...register("document")} placeholder="Document" type="text" />
    </div>
  );
}
