import { ITask } from '@kkrawczyk/todo-common';
import { FC, useCallback, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { modalVisibilityState } from '../../atoms/modal';
import { ContextMenuOpion } from '../../enums';
import { useRemoveTasks } from '../../hooks/tasks/useRemoveTasks';
import { TasksContextMenuContext } from '../../providers/TasksContextMenuProvider';
import { ContextualModal } from '../Modal/ContextualModal';
import { TaskItem } from './TaskItem/TaskItem';

interface ITasksListProps {
	tasks: ITask[] | undefined;
	redirectUrl: string;
}

export const TasksList: FC<ITasksListProps> = ({ tasks, redirectUrl }) => {
	const isVisible = useRecoilValue(modalVisibilityState);
	const { removeTaskMutation } = useRemoveTasks();
	const { tasksContextlMenu } = useContext(TasksContextMenuContext);

	const onRemoveTask = useCallback(async (): Promise<void> => {
		if (!tasksContextlMenu?.elementId) return;
		await removeTaskMutation();
	}, [tasksContextlMenu]);

	return (
		<>
			{tasks?.map((task, index) => (
				<TaskItem key={index} task={task} index={index} redirectTo={redirectUrl} />
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
