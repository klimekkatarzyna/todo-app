import React, { EventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import { ITask, ITaskStatus } from '../../interfaces';
import Loader from '../Loader/Loader';
import ComplitedTasks from './ComplitedTasks';
import TaskItem from './TaskItem/TaskItem';
import useTask from './useTask';

const TasksListContainer = styled.div`
    box-shadow: inset 0 1px 0 0 #e5e5e5;
`;

interface IinitialDnDState {
    draggedFrom: number;
    draggedTo: number;
    isDragging: boolean;
    originalOrder: ITask[];
    updatedOrder: ITask[];
}

const initialDnDState: IinitialDnDState = {
    draggedFrom: 0,
    draggedTo: 0,
    isDragging: false,
    originalOrder: [],
    updatedOrder: []
}

const TasksList = () => {
    const { getTasksOfCurrentListQuery, getTasksOfCurrentListLoading, mutateChangeTaskStatus } = useTask();

    const inComletedTasks = useMemo(() => (getTasksOfCurrentListQuery?.body?.tasks || []).filter(task => task.taskStatus === ITaskStatus.inComplete), [getTasksOfCurrentListQuery]);
    const [inCompletedTaskslist, setInCompletedTasksList] = useState<ITask[]>(inComletedTasks);
    
    useEffect(() => {
        setInCompletedTasksList(inComletedTasks);
    }, [getTasksOfCurrentListQuery]);

    const onMarkTaskAsCompleted = useCallback((taskId: string) => {
        mutateChangeTaskStatus({ taskId: taskId, taskStatus: ITaskStatus.complete });
    }, []);

    const onMarkTaskAsInCompleted = useCallback((taskId: string) => {
        mutateChangeTaskStatus({ taskId: taskId, taskStatus: ITaskStatus.inComplete });
    }, []);

    const { onDragStart, onDragOver, onDragLeave, onDrop } = useDragAndDrop(inCompletedTaskslist, setInCompletedTasksList);

    return (
        <TasksListContainer>
            {getTasksOfCurrentListLoading ? (
                <Loader />
            ) : (
                <>
                    {inCompletedTaskslist?.map((task, index) => 
                        <TaskItem
                            task={task}
                            index={index}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            onDragLeave={onDragLeave}
                            onChange={onMarkTaskAsCompleted} />
                    )}
                    <ComplitedTasks onMarkTaskAsInCompleted={onMarkTaskAsInCompleted} />
                </>
            )}
        </TasksListContainer>
    );
};

export default TasksList;