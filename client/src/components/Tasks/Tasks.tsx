import { FC } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Loader } from 'react-feather';
import { ComplitedTasks } from './ComplitedTasks';
import { InCompletedTasks } from './InCompletedTasks';

export const TasksList: FC = () => {
	const { inCompletedTasks, completedTasks, isLoading } = useTasks();

	return (
		<div className='flex overflow-y-scroll overflow-x-hidden flex-1 flex-col'>
			<div>
				{isLoading ? (
					<Loader className='animate-spin m-auto' />
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
