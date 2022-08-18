import { ITask } from '@kkrawczyk/todo-common';
import { useCallback, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { taskInMyDayAction } from '../../actions/tasks';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { QueryKey } from '../../enums';
import { HttpResponse } from '../../utils/http';

export const useTasksInMyDay = () => {
	const query = useQueryClient();
	const [isMyDayTask, setIsMyDayTask] = useState<boolean>(false);
	const { authData } = useContext<AuthContextType>(AuthContext);

	const taskInMyDay = useCallback(
		(tasks: ITask[] | undefined, response: HttpResponse<ITask>) =>
			tasks?.map(task => (task._id === response.body?._id ? { ...task, isMyDay: response.body?.isMyDay } : task)),
		[]
	);

	const {
		mutate: taskInMyDayMutation,
		error,
		isLoading: taskInMyDayLoading,
	} = useMutation(taskInMyDayAction, {
		onSuccess: async response => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, response.body?.parentFolderId], (tasks: ITask[] | undefined) =>
				taskInMyDay(tasks, response)
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksList], (tasks: ITask[] | undefined) => taskInMyDay(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getMyDayTasks], (tasks: ITask[] | undefined) => taskInMyDay(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getImportanceTasks], (tasks: ITask[] | undefined) => taskInMyDay(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getAssignedTasks, authData?._id], (tasks: ITask[] | undefined) =>
				taskInMyDay(tasks, response)
			);
			query.setQueryData<ITask | undefined>([QueryKey.getTask, response.body?._id], (task: ITask | undefined) =>
				task?._id === response.body?._id ? { ...task, isMyDay: response.body?.isMyDay } : task
			);
			toast.success(response.body?.isMyDay ? 'Zadanie dodane do "Mój dzień' : 'Zadanie usunięte z widoku "Mój dzień"');
			setIsMyDayTask(!isMyDayTask);
		},
	});

	return {
		taskInMyDayMutation,
		taskInMyDayLoading,
		isMyDayTask,
	};
};
