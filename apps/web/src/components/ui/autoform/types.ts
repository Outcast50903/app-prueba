/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import type { UseFormReturn } from "react-hook-form";
import type { ExtendableAutoFormProps } from "@autoform/react";
import type { ZodObjectOrWrapped } from "@autoform/zod";

import { UI_COMPONENTS, INPUT_COMPONENTS } from "./config";

type InferredZodType<T> = T extends ZodObjectOrWrapped ? z.infer<T> : never;

export type AutoFormProps<TSchema extends ZodObjectOrWrapped> = Omit<
  ExtendableAutoFormProps<TSchema>,
  "schema" | "onSubmit" | "defaultValues"
> & {
  formRef?: React.RefObject<HTMLFormElement | null>;
  formSchema: TSchema;
  values?: Partial<z.infer<TSchema>>;
  onSubmit?: (
    data: z.infer<TSchema>,
    form: UseFormReturn<TSchema, any, TSchema>
  ) => void | Promise<void>;
  uiComponents?: Partial<typeof UI_COMPONENTS>;
  formComponents?: Partial<typeof INPUT_COMPONENTS>;
  defaultValues?: Partial<z.infer<TSchema>>;
};

export type FormData<TSchema extends ZodObjectOrWrapped> =
  InferredZodType<TSchema>;
