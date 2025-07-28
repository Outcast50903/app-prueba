import { FormProvider, useForm, type DefaultValues, type Resolver } from "react-hook-form";
import { AutoForm as BaseAutoForm } from "@autoform/react";
import { type ZodObjectOrWrapped, ZodProvider } from "@autoform/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { INPUT_COMPONENTS, UI_COMPONENTS } from "./config";
import type { AutoFormProps, FormData } from "./types";

export function AutoForm<TSchema extends ZodObjectOrWrapped>({
  formSchema,
  values,
  onSubmit,
  uiComponents,
  formComponents,
  defaultValues,
  formRef,
  ...props
}: AutoFormProps<TSchema>) {
  const schemaProvider = new ZodProvider(formSchema);

  const form = useForm<FormData<TSchema>>({
    resolver: zodResolver(formSchema) as Resolver<FormData<TSchema>, any, FormData<TSchema>>,
    defaultValues: defaultValues as DefaultValues<FormData<TSchema>> | undefined,
    values: values as FormData<TSchema> | undefined,
  });
  
  return (
    <FormProvider {...form}>
      <BaseAutoForm
        {...props}
        onSubmit={(data, form) => {
          console.log("🚀 ~ AutoForm ~ form:", JSON.stringify(form, null, 2))
          console.log("🚀 ~ AutoForm ~ data:", JSON.stringify(data, null, 2))
          const parsedValues = formSchema.safeParse(data);
          if (parsedValues.success) {            
            onSubmit?.(parsedValues.data, form);
          }
        }}
        schema={schemaProvider}
        defaultValues={defaultValues as Partial<FormData<TSchema>> | undefined}
        uiComponents={{ ...UI_COMPONENTS, ...uiComponents }}
        formComponents={{ ...INPUT_COMPONENTS, ...formComponents }}
        formProps={{ ref: formRef }}
      />
    </FormProvider>
  );
}
