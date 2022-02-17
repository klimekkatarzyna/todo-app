import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { HttpResponse } from '../utils/http';
import { Loader } from '../components/Loader/Loader';
import { ITasksResponse, ITaskStatus } from '../interfaces/task';
import { TaskItem } from '../components/Tasks/TaskItem/TaskItem';
import { useIncompleteCompleteTasks } from '../hooks/useIncompleteCompleteTasks';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { onGetImportanceTasksAction } from '../actions/tasks';

export const Important: FC = () => {
	const { inCompletedTaskslist, setInCompletedTasksList, onMarkTaskAsCompleted, changeTaskImportanceMutation } = useIncompleteCompleteTasks();
	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(inCompletedTaskslist, setInCompletedTasksList);
	const {
		data: importanceTasksResponse,
		isLoading,
		isError,
	} = useQuery<HttpResponse<ITasksResponse>>(['getImportanceTasks'], onGetImportanceTasksAction);

	const tasksList = useMemo(
		() => importanceTasksResponse?.body?.tasks?.filter(taskData => taskData?.taskStatus === ITaskStatus.inComplete),
		[importanceTasksResponse]
	);

	return (
		<Board>
			<Toolbar name={'Wazne'} colorType={'blue'} />
			{isLoading ? (
				<Loader />
			) : (
				tasksList?.map((task, index) => (
					<TaskItem
						key={index}
						task={task}
						index={index}
						dragAndDrop={dragAndDrop}
						onDragStart={onDragStart}
						onDragOver={onDragOver}
						onDrop={onDrop}
						onDragLeave={onDragLeave}
						onChange={onMarkTaskAsCompleted}
						changeTaskImportance={changeTaskImportanceMutation}
					/>
				))
			)}
		</Board>
	);
};
