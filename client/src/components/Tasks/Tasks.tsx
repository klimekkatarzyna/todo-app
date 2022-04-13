import { FC, useContext } from 'react';
import { ContextualMenuOpion } from '../../enums';
import { useTasks } from '../../hooks/useTasks';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { Loader } from 'react-feather';
import { Modal } from '../Modal/Modal';
import { ComplitedTasks } from './ComplitedTasks';
import { InCompletedTasks } from './InCompletedTasks';

export const TasksList: FC = () => {
	const { isVisible } = useContext(ModalVisibilityContext);
	const { getTasksOfCurrentListLoading, removeTaskMutation } = useTasks();

	return (
		<div className='h-auto min-h-min overflow-hidden overflow-y-scroll'>
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
				<Modal
					title='To zadanie zostanie trwale usunięte'
					contextualType={ContextualMenuOpion.remove_task}
					onHandleAction={removeTaskMutation}>
					<span>{'Tej akcji nie można cofnąć'}</span>
				</Modal>
			)}
		</div>
	);
};
