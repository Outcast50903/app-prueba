import { buildZodFieldConfig } from "@autoform/react";
import type { FieldTypes } from "./config";

export const fieldConfig = buildZodFieldConfig<FieldTypes, object>();
