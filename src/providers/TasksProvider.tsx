import React, { FC, useEffect, useMemo, useState, createContext, SetStateAction } from 'react';
import { useQueryClient } from 'react-query';
import { ITask } from '../interfaces/task';

export interface TasksContextType {
	inCompletedTaskslist: ITask[];
	setInCompletedTasksList: React.Dispatch<SetStateAction<ITask[]>>;
	completedTaskslist: ITask[];
	setComplitedTasksList: React.Dispatch<SetStateAction<ITask[]>>;
}

// better do it in separate file because the values return by the context will be use in few files
export const TasksContext = createContext<TasksContextType>({} as TasksContextType);

interface ITasksProvider {
	children: React.ReactNode;
}

export const TasksProvider: FC<ITasksProvider> = ({ children }) => {
	const query = useQueryClient();

	const [inCompletedTaskslist, setInCompletedTasksList] = useState<ITask[]>([] || undefined);
	const [completedTaskslist, setComplitedTasksList] = useState<ITask[]>([] || undefined);
	// const [sort, setSort] = useState<SortType>({ key: SortTaskType .title, direction: 'asc', keyType: 'string' });

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
