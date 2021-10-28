import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ITask } from '../../interfaces';
import TaskItem from './TaskItem/TaskItem';
import { COLOURS } from '../../constants';
import Accordion from '../Accordion/Accordion';

const TasksNumber = styled.span`
    margin-left: 1rem;
    font-size: 1rem;
    color: ${COLOURS.darkerGrey};
`;

interface IComplitedTasks {
    comletedTasks: ITask[] | undefined;
    onMarkTaskAsInCompleted: (taskId: string) => void;
}

const ComplitedTasks = ({ comletedTasks, onMarkTaskAsInCompleted }: IComplitedTasks) => {
    
    return (
        <Accordion title={'Wykonane'} details={<TasksNumber>{comletedTasks?.length}</TasksNumber>}>
            {comletedTasks?.map((task: ITask) => 
                <TaskItem task={task} onChange={onMarkTaskAsInCompleted} isCompleted />
            )}
        </Accordion>
    );
};

export default ComplitedTasks;