import { ITask } from '@kkrawczyk/todo-common';
import { FC, useCallback, useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { modalVisibilityState } from '../../atoms/modal';
import { ContextMenuOpion } from '../../enums';
import { useRemoveTasks } from '../../hooks/tasks/useRemoveTasks';
import { TasksContextMenuContext } from '../../providers/TasksContextMenuProvider';
import { ContextualModal } from '../Modal/ContextualModal';
import { TaskItem } from './TaskItem/TaskItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export const TasksList: FC<{ tasks: ITask[] | undefined; redirectUrl: string }> = ({ tasks, redirectUrl }) => {
	const isVisible = useRecoilValue(modalVisibilityState);
	const { removeTaskMutation } = useRemoveTasks();
	const { tasksContextlMenu } = useContext(TasksContextMenuContext);
	const [parent] = useAutoAnimate();

	const onRemoveTask = useCallback(async (): Promise<void> => {
		if (!tasksContextlMenu?.elementId) return;
		await removeTaskMutation();
	}, [tasksContextlMenu, removeTaskMutation]);

	type parentType = React.LegacyRef<HTMLDivElement> | undefined;

	return (
		<div ref={parent as parentType}>
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
		</div>
	);
};
