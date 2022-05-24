import { FC } from 'react';
import { useQuery } from 'react-query';
import { onGetMayDayTasksAction } from '../actions/tasks';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { ROUTE, QueryKey } from '../enums';
import { Loader } from 'react-feather';
import { ITask } from '@kkrawczyk/todo-common';
import { buildUrl } from '../utils/paths';
import { TasksList } from '../components/Tasks/TasksList';

export const MyDay: FC = () => {
	const { data, isLoading } = useQuery<ITask[] | undefined>(QueryKey.getMyDayTasks, onGetMayDayTasksAction);

	return (
		<Board>
			<Toolbar name={'Mój dzień'} colorType={'grey'} isDateVisible />
			{isLoading ? <Loader className='m-auto' /> : <TasksList tasks={data} redirectUrl={`${buildUrl(ROUTE.myDay)}/`} />}
		</Board>
	);
};
