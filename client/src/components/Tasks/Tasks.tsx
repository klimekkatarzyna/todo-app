import { FC, useContext } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Loader } from 'react-feather';
import { ComplitedTasks } from './ComplitedTasks';
import { InCompletedTasks } from './InCompletedTasks';
import { ContextMenuOpion } from '../../enums';
import { ContextualModal } from '../Modal/ContextualModal';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';

export const TasksList: FC = () => {
	const { isVisible } = useContext(ModalVisibilityContext);
	const { getTasksOfCurrentListLoading, removeTaskMutation } = useTasks();

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
					onHandleAction={removeTaskMutation}>
					<span>{'Tej akcji nie można cofnąć'}</span>
				</ContextualModal>
			)}
		</div>
	);
};
