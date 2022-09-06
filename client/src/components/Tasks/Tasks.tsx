import { FC } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Loader } from 'react-feather';
import { ComplitedTasks } from './ComplitedTasks';
import { UnCompletedTasks } from './UnCompletedTasks';

export const TasksList: FC = () => {
	const { unCompletedTasks, completedTasks, isLoading } = useTasks();

	return (
		<div className='flex overflow-y-scroll overflow-x-hidden flex-1 flex-col max-h-[70vh]'>
			<div>
				{isLoading ? (
					<Loader className='animate-spin m-auto' />
				) : (
					<>
						<UnCompletedTasks tasks={unCompletedTasks} />
						<ComplitedTasks tasks={completedTasks} />
					</>
				)}
			</div>
		</div>
	);
};
