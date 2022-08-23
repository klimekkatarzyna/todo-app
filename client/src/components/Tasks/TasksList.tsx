import { ITask } from '@kkrawczyk/todo-common';
import { FC, useCallback, useContext } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalVisibilityState } from '../../atoms/modal';
import { ContextMenuOpion, ROUTE } from '../../enums';
import { useRemoveTasks } from '../../hooks/tasks/useRemoveTasks';
import { TasksContextMenuContext } from '../../providers/TasksContextMenuProvider';
import { ContextualModal } from '../Modal/ContextualModal';
import { TaskItem } from './TaskItem/TaskItem';
import { AutoAnimateWrapper } from '../../AutoAnimateWrapper';
import { useMatch } from 'react-router-dom';
import { elementVisibilityState } from '../../atoms/elementVisibility';

export const TasksList: FC<{ tasks: ITask[] | undefined; redirectUrl: string }> = ({ tasks, redirectUrl }) => {
	const isVisible = useRecoilValue(modalVisibilityState);
	const { removeTaskMutation } = useRemoveTasks();
	const { tasksContextlMenu } = useContext(TasksContextMenuContext);
	const match = useMatch(ROUTE.search);
	const [, setIsElementVisible] = useRecoilState(elementVisibilityState);

	const onRemoveTask = useCallback(async (): Promise<void> => {
		if (!tasksContextlMenu?.elementId) return;
		await removeTaskMutation();
		setIsElementVisible(false);
	}, [tasksContextlMenu, removeTaskMutation, setIsElementVisible]);

	return (
		<AutoAnimateWrapper>
			{tasks?.map((task, index) => (
				<TaskItem key={index} task={task} index={index} redirectTo={redirectUrl} />
			))}

			{!tasks?.length && !match?.pattern.end && <div className='p-2'>{'Brak zadań'}</div>}

			{isVisible && (
				<ContextualModal
					title='To zadanie zostanie trwale usunięte'
					contextualType={ContextMenuOpion.remove_task}
					onHandleAction={onRemoveTask}>
					<span>{'Tej akcji nie można cofnąć'}</span>
				</ContextualModal>
			)}
		</AutoAnimateWrapper>
	);
};
