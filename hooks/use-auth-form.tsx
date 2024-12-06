/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ToastMessage } from "@/components/ui/toast-message";
import {
  SignUpDto,
  SignInDto,
  signUpSchema,
  signInSchema,
  EmailVerificationDto,
  emailVerificationSchema,
} from "@/schemas/auth";
import { useSignInForm } from "./use-signin-form";
import { useSignUpForm } from "./use-signup-form";
import { useEmailVerification } from "./use-email-verification";

type AuthFormType = "signUp" | "signIn";

export const useAuthForm = (type: AuthFormType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const form = useForm<SignUpDto | SignInDto>({
    resolver: zodResolver(type === "signUp" ? signUpSchema : signInSchema),
    defaultValues:
      type === "signUp"
        ? {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }
        : { email: "", password: "" },
  });

  const verificationForm = useForm<EmailVerificationDto>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  const signInSubmit = useSignInForm(setIsLoading);
  const signUpSubmit = useSignUpForm(setIsLoading, setPendingVerification);
  const verifyEmail = useEmailVerification(setIsLoading);

  const onSubmit = async (data: SignUpDto | SignInDto) => {
    setIsLoading(true);
    try {
      // Here you would typically call your API to sign up or sign in
      console.log(data);
      const message =
        type === "signUp"
          ? await signUpSubmit(data as SignUpDto)
          : await signInSubmit(data as SignInDto);
      console.log(message);

      toast.success(
        <ToastMessage
          title={type === "signUp" ? "Account created" : "Welcome back!"}
          description={
            type === "signUp"
              ? "You have successfully signed up."
              : "You have successfully signed in."
          }
        />
      );
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      toast.error(<ToastMessage title="Error" description={error.message} />);
    } finally {
      setIsLoading(false);
    }
  };

  const onVerify = async (data: EmailVerificationDto) => {
    setIsLoading(true);
    try {
      console.log(data);
      await verifyEmail(data);
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
    pendingVerification,
    verificationForm,
    onVerify,
  };
};
