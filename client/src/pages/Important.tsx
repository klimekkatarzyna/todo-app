import { FC } from 'react';
import { useQuery } from 'react-query';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { onGetImportanceTasksAction } from '../actions/tasks';
import { ITask } from '@kkrawczyk/todo-common';
import { Loader } from 'react-feather';
import { ROUTE, QueryKey } from '../enums';
import { buildUrl } from '../utils/paths';
import { TasksList } from '../components/Tasks/TasksList';

export const Important: FC = () => {
	const { data, isLoading, isError } = useQuery<ITask[] | undefined>([QueryKey.getImportanceTasks], onGetImportanceTasksAction);

	return (
		<Board>
			<Toolbar name={'Wazne'} colorType={'blue'} />
			{isLoading ? <Loader className='m-auto' /> : <TasksList tasks={data} redirectUrl={`${buildUrl(ROUTE.important)}/`} />}
		</Board>
	);
};
