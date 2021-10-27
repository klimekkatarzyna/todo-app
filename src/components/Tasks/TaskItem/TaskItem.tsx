import React, { FC, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../../constants';
import { ITask, ITaskStatus } from '../../../interfaces';
import { getDay, getDayName, getMonth, parseUTCtoDate } from '../../../utils/date';
import Checkbox from '../../Checkbox/Checkbox';
import ImportanceButton from '../../ImportanceButton/ImportanceButton';

const TaskItemWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.6rem;
    min-height: 34px;
    cursor: pointer;
    &:hover {
        background-color: ${COLOURS.lightGrey};
    }
`;

const Names = styled.button`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 1rem;
    margin-right: auto;
    border: none;
    background-color: inherit;
    outline: none;
`;

const TaskName = styled.div`
    color: ${COLOURS.fontColor};
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
    onChange: (taskId: string) => void;
}

const TaskItem: FC<ITaskItem> = ({ task, onChange }) => {
    const tooltipText = useMemo(() => task.taskStatus === ITaskStatus.complete ? 'oznacz jako niewykonane' : 'oznacz jako wykonane', [task]);
    const onHandleChange = useCallback(() => {
        onChange(task._id)
    }, [task]);

    return (
        <TaskItemWrapper>
            <Checkbox
                round
                checked={task.taskStatus === ITaskStatus.complete}
                color={task.themeColor}
                onChange={onHandleChange}
                tooltipText={tooltipText} />
            <Names>
                <TaskName>{task?.title}</TaskName>
                <div>
                    {task?.groupName && <GroupName>{task?.groupName}</GroupName>}
                    {task?.createdAt && <TaskItemInfo color={task.themeColor}>{`${getDayName(parseUTCtoDate(task?.createdAt))}, ${getDay(parseUTCtoDate(task?.createdAt))} ${getMonth(parseUTCtoDate(task?.createdAt))}`}</TaskItemInfo>}
                </div>
            </Names>
            <ImportanceButton isChecked={false} />
        </TaskItemWrapper>
    );
};

export default TaskItem;