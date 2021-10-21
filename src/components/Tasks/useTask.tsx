import React, { useCallback } from 'react';
import { http } from '../../utils/http';
import * as api from '../../services';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';
import { IUseParams, ITasksResponse } from '../../interfaces';

enum Importance {
    normal = 'Normal'
}

interface ICreateTaskProps {
    title: string;
    parentFolderId: string;
    importance?: Importance;
}

const useTask = () => {
    const { listId } = useParams<IUseParams>();

    const createTask = ({ title, parentFolderId, importance }: ICreateTaskProps) => {
        return http(api.createTask, 'POST', {
            body: JSON.stringify({ title, importance: importance || Importance.normal, parentFolderId }),
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

    const { mutate: mutateCreateTask } = useMutation(createTask);

    const getTasksOfCurrentList = useCallback((): Promise<ITasksResponse> => {
        //if (!listId) return;
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
    
    return {
        mutateCreateTask,
        getTasksOfCurrentListLoading,
        getTasksOfCurrentListQuery
    }
};

export default useTask;