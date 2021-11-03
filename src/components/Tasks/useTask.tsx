import React, { useCallback } from 'react';
import { http, HttpResponse } from '../../utils/http';
import * as api from '../../services';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { IUseParams, ITasksResponse, ITask, ITaskStatus, IChangeTaskStatusToCompleteProps } from '../../interfaces';
import { AppColorType } from '../../enums';

enum Importance {
    normal = 'Normal'
}

interface ICreateTaskProps {
    title: string;
    parentFolderId: string;
    importance?: Importance;
    themeColor?: AppColorType;
}

const useTask = () => {
    const query = useQueryClient();
    const { listId, taskId } = useParams<IUseParams>();

    const createTask = ({ title, parentFolderId, importance, themeColor }: ICreateTaskProps): Promise<HttpResponse<ITask>> => {
        return http(api.createTask, 'POST', {
            body: JSON.stringify({ title,
                importance: importance || Importance.normal,
                parentFolderId,
                themeColor: themeColor,
                taskStatus: ITaskStatus.inComplete
            }),
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => {
            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    };

    const { mutate: mutateCreateTask } = useMutation(createTask, {
        onSuccess: () => {
            query.invalidateQueries(['tasksOfCurrentList'])
        }
    });

    const getTasksOfCurrentList = useCallback((): Promise<ITasksResponse> => {
        return http(`${api.getTasks}/${listId}`, 'GET', {
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => {
            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }, [listId]);

    const { data: getTasksOfCurrentListQuery, isLoading: getTasksOfCurrentListLoading } = useQuery<ITasksResponse>(['tasksOfCurrentList', listId], getTasksOfCurrentList);

    const changeTaskStatus = ({ taskId, taskStatus }: IChangeTaskStatusToCompleteProps): Promise<HttpResponse<ITask>> => {
        return http(`${api.changeTaskStatus}/${taskId}`, 'PATCH', {
            body: JSON.stringify({ taskStatus }),
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => {
            console.log('?', taskId, taskStatus, response);
            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    };

    const { mutate: mutateChangeTaskStatus } = useMutation(changeTaskStatus, {
        onSuccess: () => {
            query.invalidateQueries(['tasksOfCurrentList'])
        }
    });

    const deleteTask = useCallback((taskId: string) => {
        return http(api.removeTask, 'DELETE', {
            body: JSON.stringify({ taskId }),
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => {
            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }, []);

    const { mutate: mutateRemoveTask } = useMutation(deleteTask, {
        onSuccess: () => {
            query.invalidateQueries(['tasksOfCurrentList'])
        }
    });

    const getTask = useCallback((): Promise<ITask> => {
        return http(`${api.getTask}/${taskId}`, 'GET', {
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => {
            return response.body[0];
        }).catch(error => {
            console.error(error);
            return error;
        })
    }, [taskId]);

    const { data: taskData, isLoading: taskDataLoading } = useQuery(['getTask', taskId], getTask);

    const onMarkTaskAsCompleted = useCallback((taskId: string) => {
        mutateChangeTaskStatus({ taskId: taskId, taskStatus: ITaskStatus.complete });
    }, []);

    const onMarkTaskAsInCompleted = useCallback((taskId: string) => {
        mutateChangeTaskStatus({ taskId: taskId, taskStatus: ITaskStatus.inComplete });
    }, []);
    
    return {
        mutateCreateTask,
        getTasksOfCurrentListLoading,
        getTasksOfCurrentListQuery,
        mutateChangeTaskStatus,
        mutateRemoveTask,
        taskData,
        taskDataLoading,
        onMarkTaskAsCompleted,
        onMarkTaskAsInCompleted
    }
};

export default useTask;