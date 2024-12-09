"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { BottomLink } from "../ui/bottom-link";
import { ErrorMessage } from "../ui/error-message";
import { signInAction } from "../actions/sign-in";

import { right } from "@/shared/lib/either";
import { useActionState } from "@/shared/lib/react";

export function SignInForm() {
  const [formState, action, isPending] = useActionState(
    signInAction,
    right(undefined),
  );
  return (
    <AuthFormLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account"
      action={action}
      fields={<AuthFields />}
      actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
      error={<ErrorMessage error={formState} />}
      link={
        <BottomLink
          linkText="Sign up"
          text="Don`t have an account? "
          url="/sign-up"
        />
      }
    />
  );
}
