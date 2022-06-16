import { FC, useMemo } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Loader } from 'react-feather';
import { ComplitedTasks } from './ComplitedTasks';
import { InCompletedTasks } from './InCompletedTasks';
import { useQuery } from 'react-query';
import { ITask, ITaskStatus } from '@kkrawczyk/todo-common';
import { useParams } from 'react-router-dom';
import { IUseParams } from '../../interfaces/app';
import { getTasksOfCurrentListAction } from '../../actions/tasks';
import { QueryKey } from '../../enums';

export const TasksList: FC = () => {
	const { getTasksOfCurrentListLoading } = useTasks();

	const { listId } = useParams<IUseParams>();

	const { data } = useQuery<ITask[] | undefined>(
		[QueryKey.tasksOfCurrentList, listId],
		() => getTasksOfCurrentListAction({ parentFolderId: listId }),
		{ enabled: !!listId }
	);

	const inCompletedTasks = useMemo(() => (data || []).filter(task => task.taskStatus === ITaskStatus.inComplete), [data]);
	const completedTasks = useMemo(() => (data || []).filter(task => task.taskStatus === ITaskStatus.complete), [data]);

	return (
		<div className='overflow-y-scroll h-full max-h-[80vh]'>
			<div>
				{getTasksOfCurrentListLoading ? (
					<Loader className='m-auto' />
				) : (
					<>
						<InCompletedTasks tasks={inCompletedTasks} />
						<ComplitedTasks tasks={completedTasks} />
					</>
				)}
			</div>
		</div>
	);
};
