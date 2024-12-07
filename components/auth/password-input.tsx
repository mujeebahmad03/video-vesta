/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { CustomFormFieldWithChild } from "../global/custom-form-field";

export type PasswordInputProps = {
  field?: ControllerRenderProps<any, string>;
};

export function PasswordInput({ field }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="relative">
      <Lock
        className="absolute size-4 left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <Input
        className="peer ps-9 pe-9"
        type={isVisible ? "text" : "password"}
        {...field}
      />
      <button
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
      >
        {isVisible ? (
          <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
        ) : (
          <Eye size={16} strokeWidth={2} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export const PasswordField = ({
  form,
  name,
  label,
}: {
  form: UseFormReturn<any>;
  name: string;
  label: string;
}) => {
  return (
    <CustomFormFieldWithChild
      form={form}
      name={name}
      label={label}
      renderChild={(field) => <PasswordInput field={field} />}
    />
  );
};
