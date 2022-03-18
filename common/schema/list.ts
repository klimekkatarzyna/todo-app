import { object, number, InferType } from "yup";

export const removeListSchema = object({
  listId: number().required(),
});

export type RemoveList = InferType<typeof removeListSchema>;
