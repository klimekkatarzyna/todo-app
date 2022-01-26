import { FC } from 'react';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { ITask } from '../../interfaces/task';
import { SortComponent } from '../SortComponent/SortComponent';
import { TaskItem } from './TaskItem/TaskItem';
import { useIncompleteCompleteTasks } from './useIncompleteCompleteTasks';

export const InCompletedTasks: FC = () => {
	const { inCompletedTaskslist, requestSort, setInCompletedTasksList, onMarkTaskAsCompleted, changeTaskImportanceMutation } =
		useIncompleteCompleteTasks();

	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(inCompletedTaskslist, setInCompletedTasksList);
	return (
		<>
			<SortComponent requestSort={requestSort} />
			{inCompletedTaskslist?.map((task, index) => (
				<TaskItem
					key={index}
					task={task}
					index={index}
					dragAndDrop={dragAndDrop}
					onDragStart={onDragStart}
					onDragOver={onDragOver}
					onDrop={onDrop}
					onDragLeave={onDragLeave}
					onChange={onMarkTaskAsCompleted}
					changeTaskImportance={changeTaskImportanceMutation}
				/>
			))}
		</>
	);
};
