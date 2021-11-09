import { FC, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router';
import { COLOURS } from '../../constants';
import { ITask, ITaskStatus, IUseParams } from '../../interfaces';
import { getDay, getDayName, getMonth, parseUTCtoDate } from '../../utils/date';
import Checkbox from '../Checkbox/Checkbox';
import ImportanceButton from '../ImportanceButton/ImportanceButton';

const Names = styled(Link)`
    display: flex;
    flex-direction: column;
    flex: 1;
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

interface ITaskDetailsProps {
    taskData: ITask;
    onHandleChange?: () => void;
    isCompleted?: boolean;
    isChecked: boolean;
    onClickImportanceButton: () => void;
}

const TaskDetails: FC<ITaskDetailsProps> = ({ taskData, onHandleChange, isCompleted = false, isChecked = false, onClickImportanceButton }) => {
    const { listId } = useParams<IUseParams>();
    const tooltipText = useMemo(() => taskData?.taskStatus === ITaskStatus.complete ? 'oznacz jako niewykonane' : 'oznacz jako wykonane', [taskData]);

    return (
        <>
            <Checkbox
                round 
                checked={taskData?.taskStatus === ITaskStatus.complete}
                color={taskData?.themeColor}
                onChange={onHandleChange}
                tooltipText={tooltipText} />
            <Names to={`/tasks/${listId}/${taskData?._id}`} draggable>
                <TaskName isCompleted={isCompleted}>{taskData?.title}</TaskName>
                <div>
                    {taskData?.groupName && <GroupName>{taskData?.groupName}</GroupName>}
                    {/* {taskData?.createdAt && <TaskItemInfo color={taskData?.themeColor}>{`${getDayName(parseUTCtoDate(taskData?.createdAt))}, ${getDay(parseUTCtoDate(taskData?.createdAt))} ${getMonth(parseUTCtoDate(taskData?.createdAt))}`}</TaskItemInfo>} */}
                </div>
            </Names>
            <ImportanceButton isChecked={isChecked} onClick={onClickImportanceButton} />
        </>
    );
};

export default TaskDetails;