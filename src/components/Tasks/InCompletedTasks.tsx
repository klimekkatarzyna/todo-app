import { FC } from 'react';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { SortComponent } from '../SortComponent/SortComponent';
import { TaskItem } from './TaskItem/TaskItem';
import { useTasks } from '../../hooks/useTasks';

export const InCompletedTasks: FC = () => {
	const { inCompletedTaskslist, requestSort, setInCompletedTasksList, onChangeTaskStatus, changeTaskImportanceMutation } = useTasks();

	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(inCompletedTaskslist, setInCompletedTasksList);

	return (
		<>
			<SortComponent requestSort={requestSort} />
			{inCompletedTaskslist?.map((task, index) => (
				<TaskItem
					key={task._id}
					task={task}
					index={index}
					dragAndDrop={dragAndDrop}
					onDragStart={onDragStart}
					onDragOver={onDragOver}
					onDrop={onDrop}
					onDragLeave={onDragLeave}
					onChangeTaskStatus={onChangeTaskStatus}
					changeTaskImportance={changeTaskImportanceMutation}
				/>
			))}
		</>
	);
};
