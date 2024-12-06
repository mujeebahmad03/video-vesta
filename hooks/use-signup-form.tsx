/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSignUp } from "@clerk/nextjs";

import { SignUpDto } from "@/schemas/auth";

export const useSignUpForm = (
  setIsLoading: (isLoading: boolean) => void,
  setPendingVerification: (value: boolean) => void
) => {
  const { isLoaded, signUp } = useSignUp();

  const onSubmit = async (data: SignUpDto) => {
    setIsLoading(true);

    if (!isLoaded) {
      return;
    }

    const { firstName, lastName, email, password } = data;

    try {
      await signUp.create({
        emailAddress: email,
        firstName,
        lastName,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (error: any) {
      console.log({ error: error.message });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return onSubmit;
};
