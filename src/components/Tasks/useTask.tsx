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
    const { listId } = useParams<IUseParams>();

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

    const changeTaskStatusToComplete = ({ taskId, taskStatus }: IChangeTaskStatusToCompleteProps): Promise<HttpResponse<ITask>> => {
        return http(`${api.changeTaskStatusToComplete}/${taskId}`, 'PATCH', {
            body: JSON.stringify({ taskStatus }),
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

    const { mutate: mutateChangeTaskStatusToComplete } = useMutation(changeTaskStatusToComplete, {
        onSuccess: () => {
            query.invalidateQueries(['tasksOfCurrentList'])
        }
    });
    
    return {
        mutateCreateTask,
        getTasksOfCurrentListLoading,
        getTasksOfCurrentListQuery,
        mutateChangeTaskStatusToComplete
    }
};

export default useTask;