import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { ITask } from '../../interfaces';
import TaskItem from './TaskItem/TaskItem';
import { ArrowRight } from '@styled-icons/feather/ArrowRight';
import { ArrowDown } from '@styled-icons/feather/ArrowDown';
import { COLOURS, IconWrapper } from '../../constants';

const CompletedTasksWrapper = styled.div`
    > button {
        border: none;
        background: inherit;
        padding: 0;
        padding: 1rem;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    h3 {
        font-weight: 600;
        font-size: 1rem;
        margin: 0;
    }

    svg {
        margin-right: 1rem;
    }
`;

const TasksNumber = styled.span`
    margin-left: 1rem;
    font-size: 1rem;
    color: ${COLOURS.darkerGrey};
`;

const Accordion = styled.div`

`;

interface IComplitedTasks {
    comletedTasks: ITask[] | undefined;
    onMarkTaskAsInCompleted: (taskId: string) => void;
}

const ComplitedTasks = ({ comletedTasks, onMarkTaskAsInCompleted }: IComplitedTasks) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const onToogle = useCallback(() => {
        setIsActive(!isActive);
    }, [isActive]);

    return (
        <CompletedTasksWrapper>
            <button onClick={onToogle}>
                <IconWrapper color='grey'>{isActive ? <ArrowDown /> : <ArrowRight />}</IconWrapper>
                <h3>{'Wykomane'}</h3>
                <TasksNumber>{comletedTasks?.length}</TasksNumber>
            </button>
            <Accordion>
                {isActive && (
                    comletedTasks?.map((task: ITask) => 
                        <TaskItem task={task} onChange={onMarkTaskAsInCompleted} />
                    )
                )}
            </Accordion>
        </CompletedTasksWrapper>
    );
};

export default ComplitedTasks;