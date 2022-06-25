import { FC, useMemo } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Loader } from 'react-feather';
import { ComplitedTasks } from './ComplitedTasks';
import { InCompletedTasks } from './InCompletedTasks';
import { ITaskStatus } from '@kkrawczyk/todo-common';

export const TasksList: FC = () => {
	const { tasksOfCurrentList, isLoading } = useTasks();

	const inCompletedTasks = useMemo(
		() => (tasksOfCurrentList || []).filter(task => task.taskStatus === ITaskStatus.inComplete),
		[tasksOfCurrentList]
	);
	const completedTasks = useMemo(() => (tasksOfCurrentList || []).filter(task => task.taskStatus === ITaskStatus.complete), [tasksOfCurrentList]);

	return (
		<div className='overflow-y-scroll h-full max-h-[80vh]'>
			<div>
				{isLoading ? (
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
