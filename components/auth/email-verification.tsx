/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoadingButton } from "../global/loading-button";

export const EmailVerificationForm = ({
  form,
  isLoading,
  onVerify,
}: {
  form: any;
  isLoading: boolean;
  onVerify: any;
}) => (
  <div className="space-y-6">
    <div className="space-y-2 text-center">
      <h2 className="text-2xl font-bold">Verify Your Email</h2>
      <p className="text-sm text-muted-foreground">
        We&apos;ve sent a code to your email. Please enter it below to verify
        your account.
      </p>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onVerify)} className="space-y-6">
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center">
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
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          type="submit"
          className="w-full"
          isLoading={isLoading}
          text="Verify Email"
          loadingText="Verifying..."
        />
      </form>
    </Form>
    <div className="text-center text-sm text-muted-foreground">
      Didn&apos;t receive a code?{" "}
      <button
        type="button"
        className="text-primary hover:underline"
        onClick={() => toast.info("Resending verification code...")}
      >
        Resend
      </button>
    </div>
  </div>
);
