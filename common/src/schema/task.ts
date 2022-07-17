import {
  object,
  string,
  boolean,
  InferType,
  date,
  SchemaOf,
  mixed,
  array,
} from "yup";
import { ITask, SortType, AppColor, Importance, ITaskStatus } from "../types";

export const taskIdSchema = object({
  _id: string().required(),
});

export const listIdForTasksSchema = object({
  parentFolderId: string().required(),
});

export const createEditTaskSchema: SchemaOf<ITask> = object({
  createdAt: date().optional(),
  importance: mixed<Importance>()
    .oneOf(Object.values(Importance) as Importance[])
    .optional(),
  parentFolderId: string().optional(),
  groupName: string().optional(),
  title: string()
    .min(3, "Too short!")
    .max(50, "Too Long!")
    .required("Dodaj nazwę zadania"),
  themeColor: mixed<AppColor>()
    .oneOf(Object.values(AppColor) as AppColor[])
    .optional(),
  _id: string().optional(),
  taskStatus: mixed<ITaskStatus>()
    .oneOf(Object.values(ITaskStatus) as ITaskStatus[])
    .optional(),
  deadline: string().optional(),
  isMyDay: boolean().optional(),
  assigned: string().optional(),
  sortType: mixed<SortType>()
    .oneOf(Object.values(SortType) as SortType[])
    .optional(),
  createdBy: string(),
  members: array().of(string()),
});

// A better approach
export type CreateEditTaskType = InferType<typeof createEditTaskSchema>;
