/* eslint-disable @typescript-eslint/no-explicit-any */
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { AtSign } from "lucide-react";

import { Input } from "@/components/ui/input";
import { CustomFormFieldWithChild } from "./custom-form-field";

type EmailInputProps = {
  field: ControllerRenderProps<any, string>;
};

export function EmailInput({ field }: EmailInputProps) {
  return (
    <div className="relative">
      <Input
        id="email"
        className="peer ps-9"
        placeholder="Email"
        type="email"
        {...field}
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <AtSign size={16} strokeWidth={2} aria-hidden="true" />
      </div>
    </div>
  );
}

export const EmailField = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <CustomFormFieldWithChild
      form={form}
      name="email"
      label="Email"
      renderChild={(field) => <EmailInput field={field} />}
      required
    />
  );
};
