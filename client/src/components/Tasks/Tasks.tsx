import { FC } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Loader } from 'react-feather';
import { ComplitedTasks } from './ComplitedTasks';
import { InCompletedTasks } from './InCompletedTasks';

export const TasksList: FC = () => {
	const { getTasksOfCurrentListLoading } = useTasks();

	return (
		<div className='overflow-y-scroll h-full max-h-[80vh]'>
			<div>
				{getTasksOfCurrentListLoading ? (
					<Loader className='m-auto' />
				) : (
					<>
						<InCompletedTasks />
						<ComplitedTasks />
					</>
				)}
			</div>
		</div>
	);
};
