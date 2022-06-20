import { ITask } from '@kkrawczyk/todo-common';
import React, { useCallback, useContext } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { deleteTaskAction } from '../../actions/tasks';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { QueryKey } from '../../enums';
import { IQueryError, IUseParams } from '../../interfaces/app';
import { TasksContextMenuContext } from '../../providers/TasksContextMenuProvider';
import { HttpResponse } from '../../utils/http';

export const useRemoveTasks = () => {
	const query = useQueryClient();
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { taskId, listId } = useParams<IUseParams>();
	const { tasksContextlMenu } = useContext(TasksContextMenuContext);

	const removeTask = useCallback(
		(tasks: ITask[] | undefined, response: HttpResponse<ITask>) => tasks?.filter(task => task?._id !== response.body?._id),
		[]
	);

	const { mutateAsync: removeTaskMutation } = useMutation(
		() => deleteTaskAction({ _id: tasksContextlMenu?.elementId || taskId, parentFolderId: tasksContextlMenu?.listId || listId }),
		{
			onSuccess: async response => {
				query.setQueryData<ITask[] | undefined>([QueryKey.getImportanceTasks], (tasks: ITask[] | undefined) => removeTask(tasks, response));
				query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, response.body?.parentFolderId], (tasks: ITask[] | undefined) =>
					removeTask(tasks, response)
				);
				query.setQueryData<ITask[] | undefined>([QueryKey.getMyDayTasks], (tasks: ITask[] | undefined) => removeTask(tasks, response));
				query.setQueryData<ITask[] | undefined>([QueryKey.getAssignedTasks, authData?._id], (tasks: ITask[] | undefined) =>
					removeTask(tasks, response)
				);
				query.setQueryData<ITask[] | undefined>([QueryKey.tasksList], (tasks: ITask[] | undefined) => removeTask(tasks, response));
				toast.success('Zadanie usunięte');
			},
			onError: (error: IQueryError) => {
				toast.error(`Coś poszlo nie tak: ${error.err.message}`);
			},
		}
	);

	return {
		removeTaskMutation,
	};
};