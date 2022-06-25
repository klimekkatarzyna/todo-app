import { ITask } from '@kkrawczyk/todo-common';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTaskAction } from '../../actions/tasks';
import { QueryKey } from '../../enums';
import { IUseParams } from '../../interfaces/app';

export const useTask = () => {
	const { taskId } = useParams<IUseParams>();

	const { data: taskData, isLoading: taskDataLoading } = useQuery<ITask | undefined>(
		[QueryKey.getTask, taskId],
		() => getTaskAction({ _id: taskId }),
		{ enabled: !!taskId }
	);

	return {
		taskDataLoading,
		taskData,
	};
};
