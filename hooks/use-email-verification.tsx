import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { EmailVerificationDto } from "@/schemas/auth";

export const useEmailVerification = (
  setIsVerifying: (isLoading: boolean) => void
) => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const { push } = useRouter();

  async function onVerify(values: EmailVerificationDto) {
    setIsVerifying(true);
    if (!isLoaded) {
      return;
    }

    try {
      const completeRegistration = await signUp.attemptEmailAddressVerification(
        {
          code: values.otp,
        }
      );

      if (completeRegistration.status === "complete") {
        await setActive({ session: completeRegistration.createdSessionId });
        toast.success("Email verified successfully");
        push("/dashboard");
      } else {
        toast.error("Invalid verification code");
        await setActive({ session: null });
      }
    } catch (error: any) {
      console.log({ error });
      toast.error(error.errors[0].message);
    } finally {
      setIsVerifying(false);
    }
  }

  return onVerify;
};
