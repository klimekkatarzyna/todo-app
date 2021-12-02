import React, { useEffect, useMemo, useState } from 'react';
import useDragAndDrop from '../../hooks/useDragAndDrop';
import { ITask, ITaskStatus } from '../../interfaces/task';
import TaskItem from './TaskItem/TaskItem';
import useTask from './useTask';

const InCompletedTasks = () => {
	const { getTasksOfCurrentListQuery, onMarkTaskAsCompleted, mutateChangeTaskImportance } = useTask();
	const inComletedTasks = useMemo(
		() =>
			(getTasksOfCurrentListQuery?.body?.tasks || []).filter(task => task.taskStatus === ITaskStatus.inComplete),
		[getTasksOfCurrentListQuery]
	);
	const [inCompletedTaskslist, setInCompletedTasksList] = useState<ITask[]>(inComletedTasks);

	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(
		inCompletedTaskslist,
		setInCompletedTasksList
	);

	useEffect(() => {
		setInCompletedTasksList(inComletedTasks);
	}, [getTasksOfCurrentListQuery]);

	return (
		<>
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
