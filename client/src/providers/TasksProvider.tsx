import React, { FC, useMemo, useState, createContext, SetStateAction } from 'react';
import { ITask } from '@kkrawczyk/todo-common';

export interface TasksContextType {
	inCompletedTaskslist: ITask[];
	setInCompletedTasksList: React.Dispatch<SetStateAction<ITask[]>>;
	completedTaskslist: ITask[];
	setComplitedTasksList: React.Dispatch<SetStateAction<ITask[]>>;
}

export const TasksContext = createContext<TasksContextType>({} as TasksContextType);

interface ITasksProvider {
	children: React.ReactNode;
}

export const TasksProvider: FC<ITasksProvider> = ({ children }) => {
	const [inCompletedTaskslist, setInCompletedTasksList] = useState<ITask[]>([] || undefined);
	const [completedTaskslist, setComplitedTasksList] = useState<ITask[]>([] || undefined);

	const value = useMemo(() => {
		return {
			inCompletedTaskslist,
			setInCompletedTasksList,
			completedTaskslist,
			setComplitedTasksList,
		};
	}, [inCompletedTaskslist, setInCompletedTasksList, completedTaskslist, setComplitedTasksList]);

	return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
