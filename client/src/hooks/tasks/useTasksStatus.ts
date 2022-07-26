import { ITask } from '@kkrawczyk/todo-common';
import { useCallback, useContext } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { changeTaskStatusAction } from '../../api/tasks';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { QueryKey } from '../../enums';
import { HttpResponse } from '../../utils/http';
import { useTranslation } from 'react-i18next';

export const useTasksStatus = () => {
	const { t } = useTranslation();
	const query = useQueryClient();
	const { authData } = useContext<AuthContextType>(AuthContext);

	const taskStatus = useCallback(
		(tasks: ITask[] | undefined, response: HttpResponse<ITask>) =>
			tasks?.map(task => (task._id === response.data?._id ? { ...task, taskStatus: response.data?.taskStatus } : task)),
		[]
	);

	const { mutateAsync: changeTaskStatusMutation } = useMutation(changeTaskStatusAction, {
		onSuccess: async response => {
			query.setQueryData<ITask[] | undefined>([QueryKey.getImportanceTasks], (tasks: ITask[] | undefined) => taskStatus(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getMyDayTasks], (tasks: ITask[] | undefined) => taskStatus(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getAssignedTasks, authData?._id], (tasks: ITask[] | undefined) =>
				taskStatus(tasks, response)
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksList], (tasks: ITask[] | undefined) => taskStatus(tasks, response));
			toast.success(t('task-status-changed'));
		},
	});

	return {
		changeTaskStatusMutation,
	};
};
