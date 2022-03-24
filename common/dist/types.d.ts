export interface IUserData {
    username: string;
    email: string;
    password: string;
    _id: string;
    createdAt: number;
}
export interface ITask {
    createdAt: any;
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
export declare type AppColorType = "grey" | "blue" | "red" | "green";
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
export interface IGroup {
    title: string;
    themeColor: AppColorType;
    _id: string;
    createdAt?: string;
    userId: string | undefined;
}
