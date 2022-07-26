import { ITask } from '@kkrawczyk/todo-common';
import { useCallback, useContext } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { taskInMyDayAction } from '../../api/tasks';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { QueryKey } from '../../enums';
import { HttpResponse } from '../../utils/http';
import { useTranslation } from 'react-i18next';

export const useTasksInMyDay = () => {
	const { t } = useTranslation();
	const query = useQueryClient();
	const { authData } = useContext<AuthContextType>(AuthContext);

	const taskInMyDay = useCallback(
		(tasks: ITask[] | undefined, response: HttpResponse<ITask>) =>
			tasks?.map(task => (task._id === response.data?._id ? { ...task, isMyDay: response.data?.isMyDay } : task)),
		[]
	);

	const { mutate: taskInMyDayMutation, isLoading: taskInMyDayLoading } = useMutation(taskInMyDayAction, {
		onSuccess: async response => {
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, response.data?.parentFolderId], (tasks: ITask[] | undefined) =>
				taskInMyDay(tasks, response)
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksList], (tasks: ITask[] | undefined) => taskInMyDay(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getMyDayTasks], (tasks: ITask[] | undefined) => taskInMyDay(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getImportanceTasks], (tasks: ITask[] | undefined) => taskInMyDay(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getAssignedTasks, authData?._id], (tasks: ITask[] | undefined) =>
				taskInMyDay(tasks, response)
			);
			query.setQueryData<ITask | undefined>([QueryKey.getTask, response.data?._id], (task: ITask | undefined) =>
				task?._id === response.data?._id ? { ...task, isMyDay: response.data?.isMyDay } : task
			);
			toast.success(response.data?.isMyDay ? t('task-added-to-myday') : t('task-remove-from-myday'));
		},
	});

	return {
		taskInMyDayMutation,
		taskInMyDayLoading,
	};
};
