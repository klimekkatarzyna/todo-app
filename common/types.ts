import { SchemaDefinitionProperty } from "mongoose";

export interface ITask {
  createdAt:
    | SchemaDefinitionProperty<DateConstructor | StringConstructor>
    | undefined;
  importance: string;
  parentFolderId: string;
  groupName: string;
  title: string;
  themeColor: AppColorType | undefined;
  _id?: string | undefined;
  taskStatus: string;
  deadline?: string;
  isMyDay?: boolean;
  sortType?: SortType;
}

export type AppColorType = "grey" | "blue" | "red" | "green";

export enum ITaskStatus {
  inComplete = "inComplete",
  complete = "complete",
}

export enum SortType {
  draggedItem = 0,
  createdAt = "createdAt",
  alphabetically = 2,
  deadline = 3,
  importance = 4,
  addedToDayly = 5,
}

// ---------------- list ------------------

export interface IList {
  isMainList?: boolean;
  title: string;
  taskNumber: number;
  icon: SVGRectElement;
  themeColor: AppColorType;
  _id?: string;
  createdAt?: string;
  url?: string;
  invitationToken?: string;
  owner?: string;
  members?: string[];
  userId?: string;
}
