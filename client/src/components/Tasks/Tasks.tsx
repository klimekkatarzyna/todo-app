import { FC, useCallback, useContext } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Loader } from 'react-feather';
import { ComplitedTasks } from './ComplitedTasks';
import { InCompletedTasks } from './InCompletedTasks';
import { ContextMenuOpion } from '../../enums';
import { ContextualModal } from '../Modal/ContextualModal';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { ElementVisibilityContext } from '../../providers/ElementVisibilityProvider';

export const TasksList: FC = () => {
	const { isVisible } = useContext(ModalVisibilityContext);
	const { getTasksOfCurrentListLoading, removeTaskMutation } = useTasks();
	const { onHide } = useContext(ElementVisibilityContext);

	const onRemoveTask = useCallback(async (): Promise<void> => {
		await removeTaskMutation();
		onHide();
	}, []);

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
