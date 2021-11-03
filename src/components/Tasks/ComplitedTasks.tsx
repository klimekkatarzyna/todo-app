import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ITask, ITaskStatus } from '../../interfaces';
import TaskItem from './TaskItem/TaskItem';
import { COLOURS } from '../../constants';
import Accordion from '../Accordion/Accordion';
import useTask from './useTask';
import useDragAndDrop from '../../hooks/useDragAndDrop';

const TasksNumber = styled.span`
    margin-left: 1rem;
    font-size: 1rem;
    color: ${COLOURS.darkerGrey};
`;

const ComplitedTasks: FC = () => {
    const { getTasksOfCurrentListQuery, onMarkTaskAsInCompleted } = useTask();
    const comletedTasks = useMemo(() => (getTasksOfCurrentListQuery?.body?.tasks || []).filter(task => task.taskStatus === ITaskStatus.complete), [getTasksOfCurrentListQuery]);
    const [completedTaskslist, setComplitedTasksList] = useState<ITask[]>(comletedTasks);

    const { onDragStart, onDragOver, onDragLeave, onDrop } = useDragAndDrop(comletedTasks, setComplitedTasksList);

    useEffect(() => {
        setComplitedTasksList(comletedTasks)
    }, [getTasksOfCurrentListQuery]);

    return (
        <>
            {!!completedTaskslist?.length && (
                <Accordion title={'Wykonane'} details={<TasksNumber>{comletedTasks?.length}</TasksNumber>}>
                    {completedTaskslist?.map((task: ITask, index) => 
                        <TaskItem
                            task={task}
                            onChange={onMarkTaskAsInCompleted}
                            isCompleted
                            index={index}
                            onDragStart={onDragStart}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            onDragLeave={onDragLeave} />
                    )}
                </Accordion>
            )}
        </>
    );
};

export default ComplitedTasks;