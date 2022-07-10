import { FC, useContext } from 'react';
import { Toolbar } from '../components/Toolbar';
import { Board } from '../components/Board';
import { useQuery } from 'react-query';
import { AppColor, ITask } from '@kkrawczyk/todo-common';
import { QueryKey, ROUTE } from '../enums';
import { getAssignedTasksAction } from '../actions/tasks';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { Loader } from 'react-feather';
import { buildUrl } from '../utils/paths';
import { TasksList } from '../components/Tasks/TasksList';

export const Assigned: FC = () => {
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { data, isLoading } = useQuery<ITask[] | undefined>(
		[QueryKey.getAssignedTasks, authData?._id],
		() => getAssignedTasksAction({ assigned: authData?._id }),
		{ enabled: !!authData?._id }
	);

	return (
		<Board>
			<Toolbar name={'Przypisane do mnie'} colorType={AppColor.green} />
			{isLoading ? <Loader className='animate-spin m-auto' /> : <TasksList tasks={data} redirectUrl={`${buildUrl(ROUTE.assigned)}/`} />}
		</Board>
	);
};
