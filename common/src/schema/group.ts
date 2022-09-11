import { object, string, InferType, date, SchemaOf, mixed, array } from "yup";
import { IGroup, AppColor } from "../types";

export const createEditGroupSchema: SchemaOf<IGroup> = object({
  createdAt: date().optional(),
  title: string().max(20, "Too Long!").required("Dodaj nazwę grupy"),
  themeColor: mixed<AppColor>()
    .oneOf(Object.values(AppColor) as AppColor[])
    .optional(),
  _id: string().optional(),
  userId: string().optional(),
  lists: array().of(string()).optional(),
  listId: string().optional(),
});

export type CreateEditGroupType = InferType<typeof createEditGroupSchema>;
