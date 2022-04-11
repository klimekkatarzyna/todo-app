import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { TaskItem } from '../components/Tasks/TaskItem/TaskItem';
import { useTasks } from '../hooks/useTasks';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { onGetImportanceTasksAction } from '../actions/tasks';
import { ITask, ITaskStatus } from '@kkrawczyk/todo-common';
import { Loader } from 'react-feather';

export const Important: FC = () => {
	const { inCompletedTaskslist, setInCompletedTasksList, onChangeTaskStatus, changeTaskImportanceMutation } = useTasks();
	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(inCompletedTaskslist, setInCompletedTasksList);
	const { data, isLoading, isError } = useQuery<ITask[] | undefined>(['getImportanceTasks'], onGetImportanceTasksAction);

	const tasksList = useMemo(() => data?.filter(taskData => taskData?.taskStatus === ITaskStatus.inComplete), [data]);

	return (
		<Board>
			<Toolbar name={'Wazne'} colorType={'blue'} />
			{isLoading ? (
				<Loader className='m-auto' />
			) : (
				tasksList?.map((task, index) => (
					<TaskItem
						key={task._id}
						task={task}
						index={index}
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
