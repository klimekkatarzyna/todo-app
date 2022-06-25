export interface IUserData {
  username?: string;
  email: string;
  password: string;
  _id?: string;
  createdAt?: number;
}

// ---------------- task ------------------
export interface ITask {
  createdAt?: Date;
  importance?: string;
  parentFolderId?: string;
  groupName?: string;
  title?: string;
  themeColor?: AppColor | undefined;
  _id?: string | undefined;
  taskStatus?: string;
  deadline?: string;
  isMyDay?: boolean;
  assigned?: string;
  sortType?: SortType;
  createdBy?: string;
  members?: Array<string>;
}

export enum AppColor {
  grey = "grey",
  blue = "blue",
  red = "red",
  green = "green",
  dark = "dark",
}

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

export enum Importance {
  normal = "Normal",
  high = "High",
}

// ---------------- list ------------------

export interface IList {
  isMainList?: boolean;
  title?: string;
  themeColor?: AppColor;
  _id?: string;
  createdAt?: Date;
  url?: string;
  invitationToken?: string;
  owner?: string;
  members?: string[];
  member?: string;
  userId?: string;
}

// ---------------- group ------------------
export interface IGroup {
  title?: string;
  themeColor?: AppColor;
  _id?: string;
  createdAt?: Date;
  userId?: string;
  lists?: string[];
  listId?: string;
}

export enum WebSocketEvent {
  addTask = "add-task",
  removeTask = "remove-task",
  editTask = "edit-task",
  taskStatusChange = "task-status-change",
}
