import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ToastMessage } from "@/components/ui/toast-message";
import {
  SignUpInput,
  SignInInput,
  signUpSchema,
  signInSchema,
} from "@/schemas/auth";

type AuthFormType = "signUp" | "signIn";

export const useAuthForm = (type: AuthFormType) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpInput | SignInInput>({
    resolver: zodResolver(type === "signUp" ? signUpSchema : signInSchema),
    defaultValues:
      type === "signUp"
        ? { name: "", email: "", password: "", confirmPassword: "" }
        : { email: "", password: "" },
  });

  const onSubmit = async (data: SignUpInput | SignInInput) => {
    setIsLoading(true);
    try {
      // Here you would typically call your API to sign up or sign in
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating API call
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
    } catch (error) {
      console.log({ error });
      toast.error(
        <ToastMessage
          title="Error"
          description="An error occurred. Please try again."
        />
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { form, isLoading, onSubmit };
};
