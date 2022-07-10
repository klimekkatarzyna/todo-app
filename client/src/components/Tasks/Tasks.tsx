import { FC } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Loader } from 'react-feather';
import { ComplitedTasks } from './ComplitedTasks';
import { InCompletedTasks } from './InCompletedTasks';

export const TasksList: FC = () => {
	const { inCompletedTasks, completedTasks, isLoading, requestSort } = useTasks();

	return (
		<div className='overflow-y-scroll h-full max-h-[80vh]'>
			<div>
				{isLoading ? (
					<Loader className='animate-spin m-auto' />
				) : (
					<>
						<InCompletedTasks tasks={inCompletedTasks} requestSort={requestSort} />
						<ComplitedTasks tasks={completedTasks} />
					</>
				)}
			</div>
		</div>
	);
};
