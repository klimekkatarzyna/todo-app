import { FC, useCallback, useContext, useMemo } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { contextualMenuFirstOpion } from '../../../constants';
import { IinitialDnDState } from '../../../hooks/useDragAndDrop';
import { ContextualMenu } from '../../ContextualMenu/ContextualMenu';
import { TaskDetails } from '../TaskDetails';
import { ElementVisibilityContext } from '../../../providers/ElementVisibilityProvider';
import { ITask } from '@kkrawczyk/todo-common';

interface ITaskItem {
	task: ITask;
	index: number;
	onChangeTaskStatus: (taskId: string | undefined) => void;
	isCompleted?: boolean;
	dragAndDrop?: IinitialDnDState<ITask>;
	onDragStart?: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
	onDragOver?: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
	onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
	onDragLeave?: () => void;
	changeTaskImportance: ({ parentFolderId: listId, _id: taskId, importance }: ITask) => void;
	redirectTo: string;
}

export const TaskItem: FC<ITaskItem> = ({
	task,
	index,
	onChangeTaskStatus,
	isCompleted = false,
	dragAndDrop,
	onDragStart,
	onDragOver,
	onDrop,
	onDragLeave,
	changeTaskImportance,
	redirectTo,
}) => {
	const { onShow } = useContext(ElementVisibilityContext);
	const isDragAndDrop = useMemo(() => (dragAndDrop?.draggedTo !== 0 && dragAndDrop?.draggedTo === Number(index) ? true : false), [dragAndDrop]);

	const onSelectTask = useCallback((): void => {
		onShow();
	}, [onShow]);

	return (
		<>
			<ContextMenuTrigger id={task?._id as string}>
				<div
					className={`${
						isDragAndDrop && `relative bg-sky-200`
					} flex items-center p-[0.9rem] cursor-pointer shadow-sm hover:bg-lightBlue active:bg-lightBlue`}
					key={index}
					draggable
					data-position={index}
					onDragStart={onDragStart as any} // TODO: fix
					onDragOver={onDragOver as any} // TODO: fix
					onDrop={onDrop}
					onDragLeave={onDragLeave}
					onClick={onSelectTask}>
					<TaskDetails
						taskData={task}
						redirectTo={redirectTo}
						onChangeTaskStatus={onChangeTaskStatus}
						isCompleted={isCompleted}
						changeTaskImportance={changeTaskImportance}
					/>
				</div>
			</ContextMenuTrigger>
			<ContextualMenu contextualMenuList={contextualMenuFirstOpion} elementId={task?._id || ''} />
		</>
	);
};
