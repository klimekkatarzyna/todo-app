import { ITask } from '@kkrawczyk/todo-common';
import { FC, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { modalVisibilityState } from '../../atoms/modal';
import { ContextMenuOpion } from '../../enums';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useTasks } from '../../hooks/useTasks';
import { ContextualModal } from '../Modal/ContextualModal';
import { TaskItem } from './TaskItem/TaskItem';

interface ITasksListProps {
	tasks: ITask[] | undefined;
	redirectUrl: string;
}

export const TasksList: FC<ITasksListProps> = ({ tasks, redirectUrl }) => {
	const isVisible = useRecoilValue(modalVisibilityState);
	const { removeTaskMutation } = useTasks();
	const { inCompletedTaskslist, setInCompletedTasksList, onChangeTaskStatus, changeTaskImportanceMutation } = useTasks();
	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(inCompletedTaskslist, setInCompletedTasksList);

	const onRemoveTask = useCallback(async (): Promise<void> => {
		await removeTaskMutation();
	}, []);

	return (
		<>
			{tasks?.map((task, index) => (
				<TaskItem
					key={task._id}
					task={task}
					index={index}
					redirectTo={redirectUrl}
					dragAndDrop={dragAndDrop}
					onDragStart={onDragStart}
					onDragOver={onDragOver}
					onDrop={onDrop}
					onDragLeave={onDragLeave}
					onChangeTaskStatus={onChangeTaskStatus}
					changeTaskImportance={changeTaskImportanceMutation}
				/>
			))}

			{isVisible && (
				<ContextualModal
					title='To zadanie zostanie trwale usunięte'
					contextualType={ContextMenuOpion.remove_task}
					onHandleAction={onRemoveTask}>
					<span>{'Tej akcji nie można cofnąć'}</span>
				</ContextualModal>
			)}
		</>
	);
};
