import { FC } from 'react';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { ROUTE } from '../enums';
import { Loader } from 'react-feather';
import { TaskItem } from '../components/Tasks/TaskItem/TaskItem';
import { useTasks } from '../hooks/useTasks';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { useRecoilValue } from 'recoil';
import { loadingState, searchResultState } from '../atoms/serching';

export const Searching: FC = () => {
	const searchResults = useRecoilValue(searchResultState);
	const isLoading = useRecoilValue(loadingState);

	const { inCompletedTaskslist, setInCompletedTasksList, onChangeTaskStatus, changeTaskImportanceMutation } = useTasks();
	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(inCompletedTaskslist, setInCompletedTasksList);

	return (
		<Board>
			<Toolbar name={'Wyszukiwanie'} colorType={'blue'} />

			<h2 className='pl-2 font-semibold text-lg'>Zadania</h2>
			{isLoading ? (
				<Loader className='m-auto' />
			) : (
				<div className='overflow-y-scroll h-[600px] mt-4'>
					{searchResults?.map((task, index) => (
						<TaskItem
							key={task._id}
							task={task}
							index={index}
							redirectTo={`${ROUTE.search}/`}
							dragAndDrop={dragAndDrop}
							onDragStart={onDragStart}
							onDragOver={onDragOver}
							onDrop={onDrop}
							onDragLeave={onDragLeave}
							onChangeTaskStatus={onChangeTaskStatus}
							changeTaskImportance={changeTaskImportanceMutation}
						/>
					))}
					{!searchResults?.length && <div className='ml-2'>nie naleziono wyniku</div>}
				</div>
			)}
		</Board>
	);
};
