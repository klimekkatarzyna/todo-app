import { FC } from 'react';
import { useQuery } from 'react-query';
import { onGetMayDayTasksAction } from '../actions/tasks';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { ROUTE, QueryKey } from '../enums';
import { Loader } from 'react-feather';
import { TaskItem } from '../components/Tasks/TaskItem/TaskItem';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useTasks } from '../hooks/useTasks';
import { ITask } from '@kkrawczyk/todo-common';
import { buildUrl } from '../utils/paths';

export const MyDay: FC = () => {
	const { inCompletedTaskslist, setInCompletedTasksList, onChangeTaskStatus, changeTaskImportanceMutation } = useTasks();
	const { data, isLoading } = useQuery<ITask[] | undefined>([QueryKey.getMyDayTasks], onGetMayDayTasksAction);
	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(inCompletedTaskslist, setInCompletedTasksList);

	return (
		<Board>
			<Toolbar name={'Mój dzień'} colorType={'grey'} isDateVisible />
			{isLoading ? (
				<Loader className='m-auto' />
			) : (
				data?.map((task, index) => (
					<TaskItem
						key={task._id}
						task={task}
						index={index}
						redirectTo={`${buildUrl(ROUTE.myDay)}/`}
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
