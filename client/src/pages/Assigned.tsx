import { FC, useContext } from 'react';
import { Toolbar } from '../components/Toolbar';
import { Board } from '../components/Board';
import { useQuery } from 'react-query';
import { ITask } from '@kkrawczyk/todo-common';
import { QueryKey, ROUTE } from '../enums';
import { getAssignedTasksAction } from '../actions/tasks';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { Loader } from 'react-feather';
import { TaskItem } from '../components/Tasks/TaskItem/TaskItem';
import { useTasks } from '../hooks/useTasks';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

export const Assigned: FC = () => {
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { inCompletedTaskslist, setInCompletedTasksList, onChangeTaskStatus, changeTaskImportanceMutation } = useTasks();
	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(inCompletedTaskslist, setInCompletedTasksList);
	const { data, isLoading } = useQuery<ITask[] | undefined>(
		[QueryKey.getAssignedTasks, authData?._id],
		() => getAssignedTasksAction({ assigned: authData?._id }),
		{ enabled: !!authData?._id }
	);

	return (
		<Board>
			<Toolbar name={'Przypisane do mnie'} colorType={'green'} />
			{isLoading ? (
				<Loader className='m-auto' />
			) : (
				data?.map((task, index) => (
					<TaskItem
						key={task._id}
						task={task}
						index={index}
						redirectTo={`${ROUTE.assigned}/`}
						dragAndDrop={dragAndDrop}
						onDragStart={onDragStart}
						onDragOver={onDragOver}
						onDrop={onDrop}
						onDragLeave={onDragLeave}
						onChangeTaskStatus={onChangeTaskStatus}
						changeTaskImportance={changeTaskImportanceMutation}
					/>
				))
			)}
		</Board>
	);
};
