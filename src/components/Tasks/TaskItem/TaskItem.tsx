import React, { FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../../constants';
import { ITask } from '../../../interfaces';
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

const TaskItemInfo = styled.span`
    color: ${COLOURS.red};
    font-size: 0.8rem;
`;

interface ITaskItem {
    task: ITask;
    // taskName: string;
    // groupName: string;
    // isChecked: boolean;
    // taskItemInfo?: string;
}

const TaskItem: FC<ITaskItem> = ({ task }) => {
    return (
        <TaskItemWrapper>
            <Checkbox round={true} color={'blue'} />
            <Names>
                <TaskName>{task?.title}</TaskName>
                <div>
                    {task?.groupName && <GroupName>{task?.groupName}</GroupName>}
                    {task?.createdAt && <TaskItemInfo>{`${getDayName(parseUTCtoDate(task?.createdAt))}, ${getDay(parseUTCtoDate(task?.createdAt))} ${getMonth(parseUTCtoDate(task?.createdAt))}`}</TaskItemInfo>}
                </div>
            </Names>
            <ImportanceButton isChecked={false} />
        </TaskItemWrapper>
    );
};

export default TaskItem;