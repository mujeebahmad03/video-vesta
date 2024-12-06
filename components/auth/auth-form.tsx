"use client";

import { motion } from "framer-motion";

import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  CustomFormField,
  EmailField,
  LoadingButton,
} from "@/components/common";
import { SocialSignIn } from "./social-auth";
import { PasswordField } from "./password-input";
import { EmailVerificationForm } from "./email-verification";

import { useAuthForm } from "@/hooks/use-auth-form";

interface AuthFormProps {
  type: "signUp" | "signIn";
}

export function AuthForm({ type }: AuthFormProps) {
  const {
    form,
    isLoading,
    onSubmit,
    pendingVerification,
    verificationForm,
    onVerify,
  } = useAuthForm(type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!pendingVerification ? (
        <>
          <SocialSignIn type={type} />
          <div className="relative my-6">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              OR
            </span>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {type === "signUp" && (
                <>
                  <CustomFormField
                    form={form}
                    name="firstName"
                    label="First Name"
                    required
                  />

                  <CustomFormField
                    form={form}
                    name="lastName"
                    label="Last Name"
                    required
                  />
                </>
              )}

              <EmailField form={form} />

              <PasswordField name="password" label="Password" form={form} />

              {type === "signUp" && (
                <PasswordField
                  name="confirmPassword"
                  label="Confirm Password"
                  form={form}
                />
              )}

              <div id="clerk-captcha"></div>

              <LoadingButton
                type="submit"
                className="w-full"
                isLoading={isLoading}
                text={
                  type === "signUp"
                    ? "Sign Up with Email"
                    : "Sign In with Email"
                }
                loadingText={
                  type === "signUp" ? "Signing up..." : "Signing in..."
                }
              />
            </form>
          </Form>
        </>
      ) : (
        <EmailVerificationForm
          form={verificationForm}
          isLoading={isLoading}
          onVerify={onVerify}
        />
      )}
    </motion.div>
  );
}
