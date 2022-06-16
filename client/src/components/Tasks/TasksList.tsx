import { ITask } from '@kkrawczyk/todo-common';
import { FC, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { modalVisibilityState } from '../../atoms/modal';
import { ContextMenuOpion } from '../../enums';
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

	const onRemoveTask = useCallback(async (): Promise<void> => {
		await removeTaskMutation();
	}, []);

	return (
		<>
			{tasks?.map((task, index) => (
				<TaskItem key={task._id} task={task} index={index} redirectTo={redirectUrl} />
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
