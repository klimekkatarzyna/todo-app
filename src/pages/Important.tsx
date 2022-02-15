import { FC, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { http, HttpResponse } from '../utils/http';
import * as api from '../services';
import { Loader } from '../components/Loader/Loader';
import { ITasksResponse } from '../interfaces/task';
import { TaskItem } from '../components/Tasks/TaskItem/TaskItem';
import { useIncompleteCompleteTasks } from '../components/Tasks/useIncompleteCompleteTasks';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

export const Important: FC = () => {
	const query = useQueryClient();
	const onGetImportanceTasksAction = useCallback(async () => await http<ITasksResponse>(`${api.getImportanceTasks}`, 'GET'), []);

	const {
		data: importanceTasksResponse,
		isLoading,
		isError,
	} = useQuery<HttpResponse<ITasksResponse>>(['getImportanceTasks'], onGetImportanceTasksAction);

	const { inCompletedTaskslist, setInCompletedTasksList, onMarkTaskAsCompleted, changeTaskImportanceMutation } = useIncompleteCompleteTasks();

	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(inCompletedTaskslist, setInCompletedTasksList);

	return (
		<Board>
			<Toolbar name={'Wazne'} colorType={'blue'} />
			{isLoading ? (
				<Loader />
			) : (
				importanceTasksResponse?.body?.tasks.map((task, index) => (
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
