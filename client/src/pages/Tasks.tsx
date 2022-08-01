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

	const { data, isLoading } = useQuery<IList | undefined>([QueryKey.getListById, listId], () => getListByIdAction({ _id: listId }), {
		enabled: !!listId,
	});

	return (
		<Board>
			<div>
				{isLoading ? (
					<Loader className='animate-spin m-auto' />
				) : (
					<Toolbar isListItem name={data?.title || ''} colorType={data?.themeColor} />
				)}

				<div>
					<div className='p-3 bg-border shadow-md fixed bottom-0 left-0 right-0 md:relative md:mb-4 md:pb-8'>
						<CreateTask listTheme={data?.themeColor} />
					</div>
					<TasksList />
				</div>
			</div>
		</Board>
	);
};
