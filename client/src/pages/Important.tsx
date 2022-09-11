import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { onGetImportanceTasksAction } from '../api/tasks';
import { AppColor, Importance, ITask } from '@kkrawczyk/todo-common';
import { Loader } from 'react-feather';
import { ROUTE, QueryKey } from '../enums';
import { buildUrl } from '../utils/paths';
import { TasksList } from '../components/Tasks/TasksList';

export const Important: FC = () => {
	const { data, isLoading, isError } = useQuery<ITask[] | undefined>([QueryKey.getImportanceTasks], onGetImportanceTasksAction);

	const filteredTasks = useMemo(() => data?.filter(task => task.importance === Importance.high), [data]);

	return (
		<Board>
			<Toolbar name={'Wazne'} colorType={AppColor.blue} />
			{isLoading ? (
				<Loader className='animate-spin m-auto' />
			) : (
				<TasksList tasks={filteredTasks} redirectUrl={`${buildUrl(ROUTE.important)}/`} />
			)}
		</Board>
	);
};
