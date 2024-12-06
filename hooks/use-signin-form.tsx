import { useSignIn } from "@clerk/nextjs";
import { SignInDto } from "@/schemas/auth";

export const useSignInForm = (setIsLoading: (isLoading: boolean) => void) => {
  const { isLoaded, signIn } = useSignIn();

  const onSubmit = async (data: SignInDto) => {
    setIsLoading(true);

    if (!isLoaded) {
      return;
    }

    const { email, password } = data;

    try {
      await signIn.create({
        identifier: email,
        password,
      });
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return onSubmit;
};
