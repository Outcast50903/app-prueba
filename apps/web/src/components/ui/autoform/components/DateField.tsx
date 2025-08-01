import { Input } from "@/components/ui/input";
import type { AutoFormFieldProps } from "@autoform/react";
import React from "react";

export const DateField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  error,
  id,
}) => {
  const { key, ...props } = inputProps;

  return (
    <Input
      id={id}
      type="date"
      className={error ? "border-destructive" : ""}
      {...props}
    />
  );
};
