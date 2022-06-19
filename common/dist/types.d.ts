export interface IUserData {
    username?: string;
    email: string;
    password: string;
    _id?: string;
    createdAt?: number;
}
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
export declare enum AppColor {
    grey = "grey",
    blue = "blue",
    red = "red",
    green = "green",
    dark = "dark"
}
export declare enum ITaskStatus {
    inComplete = "inComplete",
    complete = "complete"
}
export declare enum SortType {
    draggedItem = 0,
    createdAt = "createdAt",
    alphabetically = 2,
    deadline = 3,
    importance = 4,
    addedToDayly = 5
}
export declare enum Importance {
    normal = "Normal",
    high = "High"
}
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
export interface IGroup {
    title?: string;
    themeColor?: AppColor;
    _id?: string;
    createdAt?: Date;
    userId?: string;
    lists?: string[];
    listId?: string;
}
