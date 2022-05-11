import { FC } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getListByIdAction } from '../actions/lists';
import { Board } from '../components/Board';
import { CreateTask } from '../components/Tasks/CreateTask';
import { TasksList } from '../components/Tasks/Tasks';
import { Toolbar } from '../components/Toolbar';
import { IUseParams } from '../interfaces/app';
import { IList } from '@kkrawczyk/todo-common';
import { Loader } from 'react-feather';
import { QueryKey } from '../enums';

export const Tasks: FC = () => {
	const { listId } = useParams<IUseParams>();

	const { data, isLoading } = useQuery<IList | undefined>([QueryKey.getListById, listId], () => getListByIdAction({ _id: listId }));

	return (
		<Board>
			<div>
				{isLoading ? <Loader className='m-auto' /> : <Toolbar name={data?.title || ''} colorType={data?.themeColor} />}

				<div>
					<CreateTask />
					<TasksList />
				</div>
			</div>
		</Board>
	);
};
