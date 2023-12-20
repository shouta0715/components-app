"use client";

import React from "react";

import { useAuthForm } from "@/components/ui/use-auth-form";
import { ActionResult } from "@/lib/next/actions";

export interface AuthFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  action: (formData: FormData) => Promise<ActionResult>;
}

export const AuthForm = React.forwardRef<HTMLFormElement, AuthFormProps>(
  ({ className, action, ...props }, ref) => {
    const { clientActions } = useAuthForm(action);

    return (
      <form ref={ref} action={clientActions} className={className} {...props} />
    );
  }
);
