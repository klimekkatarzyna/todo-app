import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ContextMenuTrigger } from 'react-contextmenu';
import { COLOURS, contextualMenuFirstOpion } from '../../../constants';
import { IChangeTaskImportanceProps } from '../../../interfaces/task';
import { ITask } from '../../../interfaces/task';
import { IinitialDnDState } from '../../../hooks/useDragAndDrop';
import ContextualMenu from '../../ContextualMenu/ContextualMenu';
import TaskDetails from '../TaskDetails';
import { ShowElementContext } from '../../../ShowElementContext';
import { Importance } from '../../../enums';
import { UseMutateFunction } from 'react-query';
import { HttpResponse } from '../../../utils/http';

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
    dragAndDrop?: IinitialDnDState<ITask>;
    onDragStart?: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
    onDragOver?: (event:  React.DragEvent<HTMLDivElement>, index: number) => void;
    onDrop?: (event:  React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: () => void;
    changeTaskImportance: any; // TODO: fix
}

const TaskItem: FC<ITaskItem> = ({ task, index, onChange, isCompleted = false, dragAndDrop, onDragStart, onDragOver, onDrop, onDragLeave, changeTaskImportance }) => {
    const { onShowComponent } = useContext(ShowElementContext);

    const dragAndDropClass = useMemo(() => dragAndDrop?.draggedTo !== 0 && dragAndDrop?.draggedTo === Number(index) ? 'dropArea' : '', [dragAndDrop]);

    const [isImportanceButtonChecked, setIsImportanceButtonChecked] = useState<boolean>(false);
    const importanceType: Importance = useMemo(() => !isImportanceButtonChecked ? Importance.high : Importance.normal, [isImportanceButtonChecked]);

    useEffect(() => {
        setIsImportanceButtonChecked(task.importance === Importance.high)
    }, [task])

    const onHandleChange = useCallback((): void => {
        onChange(task._id);
    }, [task]);

    const onSelectTask = useCallback((): void => {
        onShowComponent();
    }, [onShowComponent]);

    const onClickImportanceButton = useCallback((): void => {
        setIsImportanceButtonChecked(!isImportanceButtonChecked);
        changeTaskImportance({ taskId: task._id, importance: importanceType });
        // TODO: add task to importance list  
    }, [isImportanceButtonChecked]);

    return (
        <>
            <ContextMenuTrigger id={task?._id}>
                <TaskItemWrapper
                    key={index}
                    draggable
                    data-position={index}
                    onDragStart={onDragStart as any} // TODO: fix
                    onDragOver={onDragOver as any} // TODO: fix
                    onDrop={onDrop}
                    onDragLeave={onDragLeave}
                    onClick={onSelectTask}
                    className={dragAndDropClass}>
                        <TaskDetails
                            taskData={task}
                            onHandleChange={onHandleChange}
                            isCompleted={isCompleted}
                            isChecked={isImportanceButtonChecked}
                            onClickImportanceButton={onClickImportanceButton} />
                </TaskItemWrapper>
            </ContextMenuTrigger>
            <ContextualMenu contextualMenuList={contextualMenuFirstOpion} listElementId={task?._id || ''} />
        </>
    );
};

export default TaskItem;