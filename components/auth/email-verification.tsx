/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { EmailVerificationDto, emailVerificationSchema } from "@/schemas/auth";

export function EmailVerificationForm() {
  const [isVerifying, setIsVerifying] = useState(false);
  const { push } = useRouter();

  const { isLoaded, signUp, setActive } = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationDto>({
    resolver: zodResolver(emailVerificationSchema),
    defaultValues: {
      otp: "",
    },
  });

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

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F9F5E8]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            We&apos;ve sent a code to your email. Please enter it below to
            verify your account.
          </p>
        </div>
        <form onSubmit={handleSubmit(onVerify)} className="space-y-6">
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              One-Time Password
            </label>
            <div className="flex items-center justify-center">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
            </div>
            {errors.otp && (
              <p className="mt-1 text-sm text-red-500">{errors.otp.message}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Please enter the 6-digit code sent to your email.
            </p>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#E07A5F] hover:bg-[#D06A4F] text-white"
            disabled={isVerifying}
          >
            {isVerifying ? "Verifying..." : "Verify Email"}
          </Button>
        </form>
        <div className="text-center text-sm text-gray-600">
          Didn&apos;t receive a code?{" "}
          <button
            type="button"
            className="text-[#2A9D8F] hover:underline"
            onClick={() => alert("Resending code...")}
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
}
