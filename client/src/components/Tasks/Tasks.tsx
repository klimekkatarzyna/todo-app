import { FC } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Loader } from 'react-feather';
import { ComplitedTasks } from './ComplitedTasks';
import { UnCompletedTasks } from './UnCompletedTasks';
import { SortTaskString, SortTaskType } from '@kkrawczyk/todo-common';

export const TasksList: FC = () => {
	const { unCompletedTasks, completedTasks, isLoading, requestSort } = useTasks();

	return (
		<div className='flex overflow-y-scroll overflow-x-hidden flex-1 flex-col max-h-[70vh]'>
			<div>
				{!!unCompletedTasks.length && (
					<div className='flex justify-end w-full pb-2 print:hidden'>{`posortowane według: ${
						SortTaskType[sessionStorage.getItem('taskSortedType') as SortTaskString]
					}`}</div>
				)}
				{isLoading ? (
					<Loader className='animate-spin m-auto' />
				) : (
					<>
						<UnCompletedTasks tasks={unCompletedTasks} requestSort={requestSort} />
						<ComplitedTasks tasks={completedTasks} />
					</>
				)}
			</div>
		</div>
	);
};
