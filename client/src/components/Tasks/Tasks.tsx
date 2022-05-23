import { FC, useCallback } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Loader } from 'react-feather';
import { ComplitedTasks } from './ComplitedTasks';
import { InCompletedTasks } from './InCompletedTasks';
import { ContextMenuOpion } from '../../enums';
import { ContextualModal } from '../Modal/ContextualModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { elementVisibilityState } from '../../atoms/elementVisibility';
import { modalVisibilityState } from '../../atoms/modal';

export const TasksList: FC = () => {
	const isVisible = useRecoilValue(modalVisibilityState);
	const { getTasksOfCurrentListLoading, removeTaskMutation } = useTasks();
	const [isElementVisible, setIsElementVisible] = useRecoilState(elementVisibilityState);

	const onRemoveTask = useCallback(async (): Promise<void> => {
		await removeTaskMutation();
		setIsElementVisible(false);
	}, [setIsElementVisible]);

	return (
		<div className='overflow-y-scroll h-full max-h-[80vh]'>
			<div>
				{getTasksOfCurrentListLoading ? (
					<Loader className='m-auto' />
				) : (
					<>
						<InCompletedTasks />
						<ComplitedTasks />
					</>
				)}
			</div>

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
