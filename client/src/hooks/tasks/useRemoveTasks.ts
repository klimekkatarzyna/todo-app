import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { deleteTaskAction } from '../../actions/tasks';
import { IUseParams } from '../../interfaces/app';
import { TasksContextMenuContext } from '../../providers/TasksContextMenuProvider';

export const useRemoveTasks = () => {
	const { taskId, listId } = useParams<IUseParams>();
	const { tasksContextlMenu } = useContext(TasksContextMenuContext);

	const { mutateAsync: removeTaskMutation } = useMutation(
		() => deleteTaskAction({ _id: tasksContextlMenu?.elementId || taskId, parentFolderId: tasksContextlMenu?.listId || listId }),
		{
			onSuccess: () => {
				toast.success('Zadanie usunięte');
			},
		}
	);

	return {
		removeTaskMutation,
	};
};
