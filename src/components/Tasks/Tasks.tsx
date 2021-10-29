import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { ITask, ITaskStatus } from '../../interfaces';
import Loader from '../Loader/Loader';
import ComplitedTasks from './ComplitedTasks';
import TaskItem from './TaskItem/TaskItem';
import useTask from './useTask';

const TasksListContainer = styled.div`
    box-shadow: inset 0 1px 0 0 #e5e5e5;
`;

const TasksList = () => {
    const { getTasksOfCurrentListQuery, getTasksOfCurrentListLoading, mutateChangeTaskStatus } = useTask();

    const onMarkTaskAsCompleted = useCallback((taskId: string) => {
        mutateChangeTaskStatus({ taskId: taskId, taskStatus: ITaskStatus.complete });
    }, []);

    const onMarkTaskAsInCompleted = useCallback((taskId: string) => {
        mutateChangeTaskStatus({ taskId: taskId, taskStatus: ITaskStatus.inComplete });
    }, []);
    

    const inComletedTasks = useMemo(() => getTasksOfCurrentListQuery?.body.tasks?.filter(task => task.taskStatus === ITaskStatus.inComplete), [getTasksOfCurrentListQuery]);
    const comletedTasks = useMemo(() => getTasksOfCurrentListQuery?.body.tasks?.filter(task => task.taskStatus === ITaskStatus.complete), [getTasksOfCurrentListQuery]);

    return (
        <TasksListContainer>
            {getTasksOfCurrentListLoading ? (
                <Loader />
            ) : (
                <>
                    {inComletedTasks?.map((task: ITask) => 
                        <TaskItem task={task} onChange={onMarkTaskAsCompleted} />
                    )}
                    {!!comletedTasks?.length && (
                        <ComplitedTasks comletedTasks={comletedTasks} onMarkTaskAsInCompleted={onMarkTaskAsInCompleted} />
                    )}
                </>
            )}
        </TasksListContainer>
    );
};

export default TasksList;