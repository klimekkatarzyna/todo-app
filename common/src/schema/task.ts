import {
  object,
  string,
  boolean,
  InferType,
  date,
  array,
  SchemaOf,
  mixed,
} from "yup";
import { ITask, SortType, AppColorTypeEnum } from "../types";

export const taskIdSchema = object({
  _id: string().required(),
});

export const listIdForTasksSchema = object({
  parentFolderId: string().required(),
});

export const createEditTaskSchema: SchemaOf<ITask> = object({
  createdAt: date().optional(),
  importance: string().optional(),
  parentFolderId: string().optional(),
  groupName: string().optional(),
  title: string()
    .min(3, "Too short!")
    .max(20, "Too Long!")
    .required("Dodaj nazwę zadania"),
  themeColor: mixed<AppColorTypeEnum>()
    .oneOf(Object.values(AppColorTypeEnum) as AppColorTypeEnum[])
    .optional(),
  _id: string().optional(),
  taskStatus: string().optional(),
  deadline: string().optional(),
  isMyDay: boolean().optional(),
  // sortType: object().optional(),
  sortType: mixed<SortType>()
    .oneOf(Object.values(SortType) as SortType[])
    .optional(),
});

// A better approach
export type CreateEditTaskType = InferType<typeof createEditTaskSchema>;
