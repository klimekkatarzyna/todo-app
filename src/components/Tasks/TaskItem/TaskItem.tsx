import React, { FC, useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router';
import { ContextMenuTrigger } from 'react-contextmenu';
import { COLOURS, contextualMenuFirstOpion } from '../../../constants';
import { ITask, ITaskStatus, IUseParams } from '../../../interfaces';
import { getDay, getDayName, getMonth, parseUTCtoDate } from '../../../utils/date';
import Checkbox from '../../Checkbox/Checkbox';
import ImportanceButton from '../../ImportanceButton/ImportanceButton';
import { IinitialDnDState } from '../../../hooks/useDragAndDrop';
import ContextualMenu from '../../ContextualMenu/ContextualMenu';
import TaskDetails from '../TaskDetails';

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

    &.dropArea {
        background: white !important;
        position: relative;

        &::before {
            content: '';
            color: ${COLOURS.blue};
            font-size: 0.5em;
            text-transform: uppercase;
            width: 100%;
            height: 100%;
            border-bottom: 2px solid ${COLOURS.blue};
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;



interface ITaskItem {
    task: ITask;
    index: number;
    onChange: (taskId: string) => void;
    isCompleted?: boolean;
    dragAndDrop?: IinitialDnDState;
    onDragStart?: (event: any, index: number) => void;
    onDragOver?: (event: any, index: number) => void;
    onDrop?: (event: any) => void;
    onDragLeave?: () => void;
}

const TaskItem: FC<ITaskItem> = ({ task, index, onChange, isCompleted = false, dragAndDrop, onDragStart, onDragOver, onDrop, onDragLeave }) => {
    const history = useHistory(); 
    const { listId } = useParams<IUseParams>();

    const [isSelected, setIsSelected] = useState<boolean>(false);
    const dragAndDropClass = useMemo(() => dragAndDrop?.draggedTo !== 0 && dragAndDrop?.draggedTo === Number(index) ? 'dropArea' : '', [dragAndDrop]);

    const onHandleChange = useCallback(() => {
        onChange(task._id)
    }, [task]);

    const onSelectElement = useCallback(() => {
        // setIsSelected(taskId === task._id)
        // console.log(taskId, task._id);
        console.log(task._id, task.title);
    }, [task]);

    return (
        <>
            <ContextMenuTrigger id={task?._id}>
                <TaskItemWrapper
                    key={index}
                    draggable
                    data-position={index}
                    onDragStart={onDragStart as any}
                    onDragOver={onDragOver as any}
                    onDrop={onDrop}
                    onDragLeave={onDragLeave}
                    onClick={onSelectElement}
                    className={dragAndDropClass}>
                        <TaskDetails taskData={task} onHandleChange={onHandleChange} isCompleted={isCompleted} />
                </TaskItemWrapper>
            </ContextMenuTrigger>
            <ContextualMenu contextualMenuList={contextualMenuFirstOpion} listElementId={task?._id || ''} />
        </>
    );
};

export default TaskItem;