import { FC } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Loader } from 'react-feather';
import { ComplitedTasks } from './ComplitedTasks';
import { InCompletedTasks } from './InCompletedTasks';
import { SortTaskString, SortTaskType } from '@kkrawczyk/todo-common';
import { useTranslation } from 'react-i18next';

export const TasksList: FC = () => {
	const { t } = useTranslation();
	const { inCompletedTasks, completedTasks, isLoading, requestSort } = useTasks();

	return (
		<div className='flex overflow-y-scroll overflow-x-hidden flex-1 flex-col max-h-[70vh]'>
			<div>
				{!!inCompletedTasks.length && (
					<div className='flex justify-end w-full pb-2 print:hidden'>{`${t('sorted-by')} ${
						SortTaskType[sessionStorage.getItem('taskSortedType') as SortTaskString]
					}`}</div>
				)}
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
