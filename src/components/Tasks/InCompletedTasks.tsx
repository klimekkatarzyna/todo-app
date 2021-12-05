import { FC } from 'react';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import { ITask } from '../../interfaces/task';
import SortComponent from '../SortComponent/SortComponent';
import TaskItem from './TaskItem/TaskItem';
import useIncompleteComplete from './useIncompleteCompleteTasks';

const InCompletedTasks: FC = () => {
	const {
		inCompletedTaskslist,
		requestSort,
		setInCompletedTasksList,
		onMarkTaskAsCompleted,
		mutateChangeTaskImportance,
	} = useIncompleteComplete();

	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(
		inCompletedTaskslist,
		setInCompletedTasksList
	);
	return (
		<>
			<SortComponent requestSort={requestSort} />
			{inCompletedTaskslist?.map((task, index) => (
				<TaskItem
					task={task}
					index={index}
					dragAndDrop={dragAndDrop}
					onDragStart={onDragStart}
					onDragOver={onDragOver}
					onDrop={onDrop}
					onDragLeave={onDragLeave}
					onChange={onMarkTaskAsCompleted}
					changeTaskImportance={mutateChangeTaskImportance}
				/>
			))}
		</>
	);
};

export default InCompletedTasks;
