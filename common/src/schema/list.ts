import { object, string, number, InferType, date, array } from "yup";

export const listIdRequiredSchema = object({
  listId: string().required(),
});

export type ListIdType = InferType<typeof listIdRequiredSchema>;

export const removeMemberFromListSchema = object({
  listId: string().required(),
  member: string().required(),
});

export type RemoveMemberFromListType = InferType<
  typeof removeMemberFromListSchema
>;

export const addUserToListSchema = object({
  invitationToken: string().required(),
  member: string().required(),
});

export type AddUserToListType = InferType<typeof addUserToListSchema>;

export const addInvitationTokenToListSchema = object({
  listId: string().required(),
  invitationToken: string().required(),
  owner: string().required(),
});

export type AddInvitationTokenToListType = InferType<
  typeof addInvitationTokenToListSchema
>;

export const listIdSchema = object({
  id: string().required(),
});

export const createListSchema = object({
  title: string().required(),
  themeColor: string(),
  createdAt: date(),
  userId: string(),
  invitationToken: string(),
  owner: string(),
  members: array().of(string()),
});

export type CreateListType = InferType<typeof createListSchema>;
