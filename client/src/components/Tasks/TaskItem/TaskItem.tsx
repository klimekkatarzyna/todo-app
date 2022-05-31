import { FC, useCallback, useContext, useMemo } from 'react';
import { IinitialDnDState } from '../../../hooks/useDragAndDrop';
import { ContextMenuComponent } from '../../ContextMenu/ContextMenuComponent';
import { TaskDetails } from '../TaskDetails';
import { ITask } from '@kkrawczyk/todo-common';
import { useBuidContextTaskMenu } from '../../../hooks/useBuildContextTaskMenu';
import { TasksContextMenuContext } from '../../../providers/TasksContextMenuProvider';
import { useRecoilState } from 'recoil';
import { elementVisibilityState } from '../../../atoms/elementVisibility';
import { useShowMenuContexify } from '../../../hooks/useShowMenuContexify';
import { ContextMenuOpion } from '../../../enums';

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
	const { handleItemClick } = useContext(TasksContextMenuContext);
	const { displayMenu } = useShowMenuContexify(task._id);
	const [isElementVisible, setIsElementVisible] = useRecoilState(elementVisibilityState);
	const isDragAndDrop = useMemo(() => (dragAndDrop?.draggedTo !== 0 && dragAndDrop?.draggedTo === Number(index) ? true : false), [dragAndDrop]);
	const { taskMenuListItems } = useBuidContextTaskMenu(task);

	const onSelectTask = useCallback((): void => {
		setIsElementVisible(true);
	}, [setIsElementVisible]);

	return (
		<>
			<div onContextMenu={displayMenu}>
				<div
					className={`${
						isDragAndDrop && `relative bg-sky-200`
					} flex items-center relative h-[3.5rem] p-[0.9rem] cursor-pointer shadow-sm hover:bg-lightBlue active:bg-lightBlue border-solid border-b-[1px] border-border-500 `}
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
			</div>
			<ContextMenuComponent
				contextMenuList={taskMenuListItems}
				elementDetails={task || ''}
				handleItemClick={handleItemClick}
				contextMenuOption={ContextMenuOpion.move_task}
			/>
		</>
	);
};
