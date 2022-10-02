import { ITask } from '@kkrawczyk/todo-common';
import { FC, useCallback, useContext } from 'react';
import { ContextMenuOpion, ROUTE } from '../../enums';
import { useRemoveTasks } from '../../hooks/tasks/useRemoveTasks';
import { TasksContextMenuContext } from '../../providers/TasksContextMenuProvider';
import { TaskItem } from './TaskItem/TaskItem';
import { AutoAnimateWrapper } from '../../AutoAnimateWrapper';
import { useMatch } from 'react-router-dom';
import { ConfirmModal } from '../Modal/ConfirmModal';
import { useModal } from '../../hooks/useModal';
import { useRecoilState } from 'recoil';
import { elementVisibilityState } from '../../atoms/elementVisibility';
import { useTranslation } from 'react-i18next';

export const TasksList: FC<{ tasks: ITask[] | undefined; redirectUrl: string }> = ({ tasks, redirectUrl }) => {
	const { t } = useTranslation();
	const { modalType, hideModal } = useModal();
	const { removeTaskMutation } = useRemoveTasks();
	const { tasksContextlMenu } = useContext(TasksContextMenuContext);
	const match = useMatch(ROUTE.search);
	const [, setIsElementVisible] = useRecoilState(elementVisibilityState);

	const onRemoveTask = useCallback(async (): Promise<void> => {
		if (!tasksContextlMenu?.elementId) return;
		await removeTaskMutation();
		hideModal();
		setIsElementVisible(false);
	}, [tasksContextlMenu, removeTaskMutation, hideModal, setIsElementVisible]);

	return (
		<AutoAnimateWrapper>
			{tasks?.map((task, index) => (
				<TaskItem key={index} task={task} index={index} redirectTo={redirectUrl} />
			))}

			{!tasks?.length && !match?.pattern.end && <div className='p-2'>{t('no-tasks')}</div>}

			{modalType === ContextMenuOpion.remove_task && (
				<ConfirmModal title={t('task-remove-modal')} onHandleAction={onRemoveTask}>
					<span>{t('task-remove-modal-subtitle')}</span>
				</ConfirmModal>
			)}
		</AutoAnimateWrapper>
	);
};
