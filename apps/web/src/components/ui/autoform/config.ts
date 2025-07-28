import type { AutoFormUIComponents } from "@autoform/react";
import { Form } from "./components/Form";
import { FieldWrapper } from "./components/FieldWrapper";
import { ErrorMessage } from "./components/ErrorMessage";
import { SubmitButton } from "./components/SubmitButton";
import { ObjectWrapper } from "./components/ObjectWrapper";
import { ArrayWrapper } from "./components/ArrayWrapper";
import { ArrayElementWrapper } from "./components/ArrayElementWrapper";
import { BooleanField } from "./components/BooleanField";
import { StringField } from "./components/StringField";
import { NumberField } from "./components/NumberField";
import { DateField } from "./components/DateField";
import { SelectField } from "./components/SelectField";

export const UI_COMPONENTS: AutoFormUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper,
};

export const INPUT_COMPONENTS = {
  string: StringField,
  number: NumberField,
  boolean: BooleanField,
  date: DateField,
  select: SelectField,
} as const;

export type FieldTypes = keyof typeof INPUT_COMPONENTS;
