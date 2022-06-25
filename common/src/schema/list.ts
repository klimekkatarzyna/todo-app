import {
  object,
  string,
  mixed,
  InferType,
  date,
  array,
  boolean,
  SchemaOf,
} from "yup";
import { AppColor, IList } from "../types";

export const listIdRequiredSchema = object({
  _id: string().required(),
});

export type ListIdType = InferType<typeof listIdRequiredSchema>;

export const removeMemberFromListSchema = object({
  _id: string().required() || undefined,
  member: string().required() || undefined,
});

export type RemoveMemberFromListType = InferType<
  typeof removeMemberFromListSchema
>;

export const addInvitationTokenToListSchema = object({
  _id: string().required(),
  invitationToken: string().required(),
  owner: string().required(),
});

export type AddInvitationTokenToListType = InferType<
  typeof addInvitationTokenToListSchema
>;

export const listIdSchema = object({
  _id: string().required(),
});

export const createEditListSchema: SchemaOf<IList> = object({
  title: string().max(20, "Too Long!").required("Podaj tytuł listy"),
  themeColor: mixed<AppColor>()
    .oneOf(Object.values(AppColor) as AppColor[])
    .optional(),
  createdAt: date().optional(),
  userId: string().optional(),
  invitationToken: string().optional(),
  owner: string().optional(),
  members: array().of(string()).optional(),
  member: string(),
  _id: string().optional(),
  url: string().optional(),
  isMainList: boolean().optional(),
});

export type CreateEditListType = InferType<typeof createEditListSchema>;
