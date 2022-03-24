import { object, string } from "yup";

export const taskIdSchema = object({
  id: string().required(),
});
