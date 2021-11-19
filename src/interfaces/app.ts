export interface IAuthData {
    auth: boolean;
    body: IUserData;
    message: string;
    status: number;
    token: string;
}

export interface IUserData {
    username: string;
    email: string;
    id: string;
    createdAt: string;
}

export enum IResponseStatus {
    error = "error",
    idle = "idle",
    loading = "loading",
    success = "success"
}

export interface IUseParams {
    listId: string;
    taskId: string;
}
