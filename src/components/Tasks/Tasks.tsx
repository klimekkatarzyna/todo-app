import { FC } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deleteTaskAction, getTasksOfCurrentListAction } from '../../actions/tasks';
import { ContextualMenuOpion } from '../../enums';
import { IUseParams } from '../../interfaces/app';
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
	const query = useQueryClient();
	const { listId } = useParams<IUseParams>();

	const { isLoading: getTasksOfCurrentListLoading } = useQuery(['tasksOfCurrentList', listId], () => getTasksOfCurrentListAction(listId));

	const { mutate: removeTaskMutation } = useMutation(deleteTaskAction, {
		onSuccess: () => {
			query.invalidateQueries(['tasksOfCurrentList']);
		},
	});

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
			<Modal title='Czy chcesz usunąć zadanie?' onHandleAction={removeTaskMutation} contextualType={ContextualMenuOpion.remove_task} />
		</TasksListContainer>
	);
};
