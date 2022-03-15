import { FC, useContext } from 'react';
import styled from 'styled-components';
import { ContextualMenuOpion } from '../../enums';
import { useModalVisibility } from '../../hooks/useModalVisibility';
import { useTasks } from '../../hooks/useTasks';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { ComplitedTasks } from './ComplitedTasks';
import { InCompletedTasks } from './InCompletedTasks';

const TasksListContainer = styled.div`
	box-shadow: inset 0 1px 0 0 #e5e5e5;
	height: auto;
	max-height: 550px;
	overflow: hidden;
	overflow-y: scroll;
`;

export const TasksList: FC = () => {
	const { isVisible } = useContext(ModalVisibilityContext);
	const { getTasksOfCurrentListLoading, removeTaskMutation } = useTasks();

	return (
		<TasksListContainer>
			<div>
				{getTasksOfCurrentListLoading ? (
					<Loader />
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
		</TasksListContainer>
	);
};
