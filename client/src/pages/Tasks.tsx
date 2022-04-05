import { FC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getListByIdAction } from '../actions/lists';
import { Board } from '../components/Board';
import { ListSettings } from '../components/ListSettings/ListSettings';
import { Loader } from '../components/Loader/Loader';
import { CreateTask } from '../components/Tasks/CreateTask';
import { TasksList } from '../components/Tasks/Tasks';
import { Toolbar } from '../components/Toolbar';
import { IUseParams } from '../interfaces/app';
import { IList } from '@kkrawczyk/todo-common';

export const Tasks: FC = () => {
	const { listId } = useParams<IUseParams>();

	const { data, isLoading } = useQuery<IList | undefined>(['getListById', listId], () => getListByIdAction({ _id: listId }));

	return (
		<Board>
			<div>
				{isLoading ? (
					<Loader />
				) : (
					<Toolbar name={data?.title || ''} colorType={data?.themeColor}>
						<ListSettings />
					</Toolbar>
				)}

				<div>
					<CreateTask />
					<TasksList />
				</div>
			</div>
		</Board>
	);
};
