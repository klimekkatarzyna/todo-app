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
import { IListItem } from '../interfaces/list';

export const Tasks: FC = () => {
	const { listId } = useParams<IUseParams>();

	const {
		data: listDataResponse,
		isLoading: listDataLoading,
		error: getListByIdError,
	} = useQuery<IListItem | undefined>(['getListById', listId], () => getListByIdAction(listId));

	return (
		<Board>
			<div>
				{listDataLoading ? (
					<Loader />
				) : (
					<Toolbar name={listDataResponse?.title || ''} colorType={listDataResponse?.themeColor}>
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