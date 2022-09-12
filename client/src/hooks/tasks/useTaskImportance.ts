import { ITask } from '@kkrawczyk/todo-common';
import { useCallback, useContext } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { changeTaskImportanceAction } from '../../api/tasks';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { QueryKey } from '../../enums';
import { HttpResponse } from '../../utils/http';

export const useTaskImportance = () => {
	const query = useQueryClient();
	const { authData } = useContext<AuthContextType>(AuthContext);

	const taskImporgance = useCallback(
		(tasks: ITask[] | undefined, response: HttpResponse<ITask>) =>
			tasks?.map(task => (task._id === response.data?._id ? { ...task, importance: response.data?.importance } : task)),
		[]
	);

	const { mutateAsync: changeTaskImportanceMutation } = useMutation(changeTaskImportanceAction, {
		onSuccess: async response => {
			query.setQueryData<ITask[] | undefined>([QueryKey.getImportanceTasks], (tasks: ITask[] | undefined) => taskImporgance(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, response.data?.parentFolderId], (tasks: ITask[] | undefined) =>
				taskImporgance(tasks, response)
			);
			query.setQueryData<ITask | undefined>([QueryKey.getTask, response.data?._id], (task: ITask | undefined) =>
				task?._id === response.data?._id ? { ...task, importance: response.data?.importance } : task
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.getMyDayTasks], (tasks: ITask[] | undefined) => taskImporgance(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getAssignedTasks, authData?._id], (tasks: ITask[] | undefined) =>
				taskImporgance(tasks, response)
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksList], (tasks: ITask[] | undefined) => taskImporgance(tasks, response));
			toast.success('Ważność zadanie zmieniona');
		},
	});

	return {
		changeTaskImportanceMutation,
	};
};
