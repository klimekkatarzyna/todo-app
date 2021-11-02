import React, { FC, useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router';
import { COLOURS } from '../../../constants';
import { ITask, ITaskStatus, IUseParams } from '../../../interfaces';
import { getDay, getDayName, getMonth, parseUTCtoDate } from '../../../utils/date';
import Checkbox from '../../Checkbox/Checkbox';
import ImportanceButton from '../../ImportanceButton/ImportanceButton';

const TaskItemWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.6rem;
    min-height: 34px;
    cursor: pointer;
    box-shadow: 0 17px 0 -16px #e5e5e5;
    
    &:hover {
        background-color: ${COLOURS.lightGrey};
    }

    &:active {
        background-color: ${COLOURS.lightBlue};
    }

`;

const Names = styled(Link)`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 1rem;
    margin-right: auto;
    border: none;
    background-color: inherit;
    outline: none;
    cursor: pointer;
    text-decoration: none;
`;

const TaskName = styled.div<{ isCompleted: boolean; }>`
    color: ${COLOURS.fontColor};
    cursor: pointer;
    ${props => props.isCompleted && css`
        text-decoration: line-through;
        color: ${COLOURS.darkerGrey};
    `};
`;

const GroupName = styled.span`
    display: inline-flex;
    color: ${COLOURS.darkerGrey};
    font-size: 0.8rem;
    margin-right: 1rem;
`;

const TaskItemInfo = styled.span<{ color: string }>`
    color: ${props => props.color ? `${COLOURS[props.color]}` : `${COLOURS.fontColor}`};
    font-size: 0.8rem;
`;

interface ITaskItem {
    task: ITask;
    index: number;
    onChange: (taskId: string) => void;
    isCompleted?: boolean;
    onDragStart?: (event: any, index: number) => void;
    onDragOver?: (event: any, index: number) => void;
    onDrop?: (event: any) => void;
    onDragLeave?: () => void;
}

const TaskItem: FC<ITaskItem> = ({ task, index, onChange, isCompleted = false, onDragStart, onDragOver, onDrop, onDragLeave }) => {
    const history = useHistory(); 
    const { listId } = useParams<IUseParams>();

    const [isSelected, setIsSelected] = useState<boolean>(false);
    const tooltipText = useMemo(() => task?.taskStatus === ITaskStatus.complete ? 'oznacz jako niewykonane' : 'oznacz jako wykonane', [task]);

    const onHandleChange = useCallback(() => {
        onChange(task._id)
    }, [task]);

    // const onSelectElement = useCallback(() => {
    //     setIsSelected(taskId === task._id)
    //     console.log(taskId, task._id);
    // }, [task]);

    return (
        <TaskItemWrapper
            key={index}
            draggable
            data-position={index}
            onDragStart={onDragStart as any}
            onDragOver={onDragOver as any}
            onDrop={onDrop}
            onDragLeave={onDragLeave}>
            <Checkbox
                round 
                checked={task?.taskStatus === ITaskStatus.complete}
                color={task?.themeColor}
                onChange={onHandleChange}
                tooltipText={tooltipText} />
            <Names to={`${history.location.pathname}/${task?._id}`} draggable>
                <TaskName isCompleted={isCompleted}>{task?.title}</TaskName>
                <div>
                    {task?.groupName && <GroupName>{task?.groupName}</GroupName>}
                    {task?.createdAt && <TaskItemInfo color={task?.themeColor}>{`${getDayName(parseUTCtoDate(task?.createdAt))}, ${getDay(parseUTCtoDate(task?.createdAt))} ${getMonth(parseUTCtoDate(task?.createdAt))}`}</TaskItemInfo>}
                </div>
            </Names>
            <ImportanceButton isChecked={false} />
        </TaskItemWrapper>
    );
};

export default TaskItem;