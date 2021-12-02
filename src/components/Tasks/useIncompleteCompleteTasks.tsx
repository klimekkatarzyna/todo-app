import React, { useEffect, useMemo, useState } from 'react';
import { ITask, ITaskStatus } from '../../interfaces/task';
import useTask from './useTask';

const useIncompleteCompleteTasks = () => {
	const { getTasksOfCurrentListQuery, onMarkTaskAsCompleted, onMarkTaskAsInCompleted, mutateChangeTaskImportance } =
		useTask();
	const inComletedTasks = useMemo(
		() =>
			(getTasksOfCurrentListQuery?.body?.tasks || []).filter(task => task.taskStatus === ITaskStatus.inComplete),
		[getTasksOfCurrentListQuery]
	);

	const comletedTasks = useMemo(
		() => (getTasksOfCurrentListQuery?.body?.tasks || []).filter(task => task.taskStatus === ITaskStatus.complete),
		[getTasksOfCurrentListQuery]
	);

	const [inCompletedTaskslist, setInCompletedTasksList] = useState<ITask[]>(inComletedTasks);
	const [completedTaskslist, setComplitedTasksList] = useState<ITask[]>(comletedTasks);

	useEffect(() => {
		setInCompletedTasksList(inComletedTasks);
	}, [getTasksOfCurrentListQuery]);

	useEffect(() => {
		setComplitedTasksList(comletedTasks);
	}, [getTasksOfCurrentListQuery]);

	return {
		inCompletedTaskslist,
		setInCompletedTasksList,
		onMarkTaskAsCompleted,
		mutateChangeTaskImportance,
		completedTaskslist,
		setComplitedTasksList,
		comletedTasks,
		onMarkTaskAsInCompleted,
	};
};

export default useIncompleteCompleteTasks;
