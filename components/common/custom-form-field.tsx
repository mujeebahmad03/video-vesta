/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type CustomFormFieldProps = {
  form: UseFormReturn<any>;
  label: string;
  name: string;
  required?: boolean;
};

export const CustomFormField = ({
  form,
  label,
  name,
  required = false,
}: CustomFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface CustomFormFieldWithChildProps extends CustomFormFieldProps {
  renderChild: (field: ControllerRenderProps<any, string>) => ReactElement;
}

export const CustomFormFieldWithChild = ({
  renderChild,
  form,
  name,
  label,
  required,
}: CustomFormFieldWithChildProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="w-full">
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>{renderChild(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
