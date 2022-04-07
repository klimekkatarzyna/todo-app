import { object, string, InferType, date, SchemaOf, mixed } from "yup";
import { IGroup, AppColorTypeEnum } from "../types";

export const createEditGroupSchema: SchemaOf<IGroup> = object({
  createdAt: date().optional(),
  title: string()
    .min(3, "Too short!")
    .max(20, "Too Long!")
    .required("Dodaj nazwę grupy"),
  themeColor: mixed<AppColorTypeEnum>()
    .oneOf(Object.values(AppColorTypeEnum) as AppColorTypeEnum[])
    .optional(),
  _id: string().optional(),
  userId: string().optional(),
});

// A better approach
export type CreateEditGroupType = InferType<typeof createEditGroupSchema>;
