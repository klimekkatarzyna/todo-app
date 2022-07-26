import { FC, useCallback, useContext } from 'react';
import { ITask } from '@kkrawczyk/todo-common';
import { IconUserName } from '../../../common/IconUserName/IconUserName';
import { useMutation, useQueryClient } from 'react-query';
import { removenUserFromTaskAction } from '../../../api/tasks';
import { QueryKey } from '../../../enums';
import toast from 'react-hot-toast';
import { Loader, X } from 'react-feather';
import { HttpResponse } from '../../../utils/http';
import { AuthContext, AuthContextType } from '../../../AuthProvider';

export const RemoveAssignment: FC<{ taskData: ITask }> = ({ taskData }) => {
	const query = useQueryClient();
	const { authData } = useContext<AuthContextType>(AuthContext);

	const taskRemoveAssigment = useCallback(
		(tasks: ITask[] | undefined, response: HttpResponse<ITask>) =>
			tasks?.map(task => (task._id === response.data?._id ? { ...task, assigned: undefined } : task)),
		[]
	);

	const { mutate, isLoading } = useMutation(removenUserFromTaskAction, {
		onSuccess: async response => {
			query.setQueryData<ITask[] | undefined>([QueryKey.getImportanceTasks], (tasks: ITask[] | undefined) =>
				taskRemoveAssigment(tasks, response)
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksOfCurrentList, taskData?.parentFolderId], (tasks: ITask[] | undefined) =>
				taskRemoveAssigment(tasks, response)
			);
			query.setQueryData<ITask | undefined>([QueryKey.getTask, response.data?._id], (task: ITask | undefined) =>
				task?._id === response.data?._id ? { ...task, assigned: undefined } : task
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.getMyDayTasks], (tasks: ITask[] | undefined) => taskRemoveAssigment(tasks, response));
			query.setQueryData<ITask[] | undefined>([QueryKey.getAssignedTasks, authData?._id], (tasks: ITask[] | undefined) =>
				taskRemoveAssigment(tasks, response)
			);
			query.setQueryData<ITask[] | undefined>([QueryKey.tasksList], (tasks: ITask[] | undefined) => taskRemoveAssigment(tasks, response));

			toast.success('Przypisanie usunięte');
		},
	});

	return (
		<button className='task-details-style mb-3 flex flex-row items-center pt-3 pb-3 pl-4' onClick={() => mutate({ _id: taskData?._id })}>
			<IconUserName member={taskData?.assigned} isFullNameVisible />
			{isLoading && <Loader />}
			<X className='icon-style ml-auto mr-4' />
		</button>
	);
};
