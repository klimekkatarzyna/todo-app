import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { createContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { changeTaskImportanceAction, taskInMyDayAction } from '../actions/tasks';
import { ContextMenuOpion, QueryKey } from '../enums';
import { IContextMenu } from '../interfaces/app';
import { ModalVisibilityContext } from '../ModalVisibilityProvider';
import toast from 'react-hot-toast';
import { Importance } from '@kkrawczyk/todo-common';
import { useTasks } from '../hooks/useTasks';

export interface TasksContextMenuContextType {
	tasksContextlMenu: IData | undefined;
	handleClick: (event: React.ChangeEvent<HTMLInputElement>, data: any) => void;
}

export const TasksContextMenuContext = createContext<TasksContextMenuContextType>({} as TasksContextMenuContextType);

type ElementId = {
	elementId: string;
	listId: string;
};

export interface IData extends IContextMenu, ElementId {}

interface ITasksContextMenuProvider {
	children: React.ReactNode;
}

export const TasksContextMenuProvider: FC<ITasksContextMenuProvider> = ({ children }) => {
	const [tasksContextlMenu, setTasksContextMenu] = useState<IData | undefined>();
	const { onShow } = useContext(ModalVisibilityContext);
	const query = useQueryClient();

	const { removeTaskMutation, onMarkTaskAsCompleted, onMarkTaskAsInCompleted } = useTasks();

	const { mutate: taskInMyDayMutation } = useMutation(taskInMyDayAction, {
		onSuccess: () => {
			query.invalidateQueries(QueryKey.tasksOfCurrentList);
			query.invalidateQueries(QueryKey.getTask);
			query.invalidateQueries(QueryKey.getMyDayTasks);
			query.invalidateQueries(QueryKey.getImportanceTasks);
			toast.success('Zadanie usunięte z widoku "Mój dzień"');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	const { mutate: changeTaskImportanceMutation } = useMutation(changeTaskImportanceAction, {
		onSuccess: () => {
			query.invalidateQueries(QueryKey.getImportanceTasks);
			query.invalidateQueries(QueryKey.tasksOfCurrentList);
			query.invalidateQueries(QueryKey.getTask);
			query.invalidateQueries(QueryKey.getMyDayTasks);
			query.invalidateQueries(QueryKey.getAssignedTasks);
			toast.success('Ważność zadanie zmieniona');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	const handleClick = useCallback((event: React.ChangeEvent<HTMLInputElement>, data: IData) => {
		setTasksContextMenu(data);
		onShow();

		switch (data?.type) {
			case ContextMenuOpion.add_to_myday:
				taskInMyDayMutation({ _id: data?.elementId, isMyDay: true });
				setTasksContextMenu(data);
				break;
			case ContextMenuOpion.remove_from_myday:
				taskInMyDayMutation({ _id: data?.elementId, isMyDay: false });
				setTasksContextMenu(data);
				break;
			case ContextMenuOpion.mark_as_important:
				changeTaskImportanceMutation({ _id: data?.elementId, parentFolderId: data?.listId, importance: Importance.high });
				setTasksContextMenu(data);
				break;
			case ContextMenuOpion.remove_importance:
				changeTaskImportanceMutation({ _id: data?.elementId, parentFolderId: data?.listId, importance: Importance.normal });
				setTasksContextMenu(data);
				break;
			case ContextMenuOpion.mark_as_complete:
				onMarkTaskAsCompleted(data?.elementId);
				setTasksContextMenu(data);
				break;
			case ContextMenuOpion.mark_as_incomplete:
				onMarkTaskAsInCompleted(data?.elementId);
				setTasksContextMenu(data);
				break;
			case ContextMenuOpion.remove_task:
				setTasksContextMenu(data);
				break;
			default:
				setTasksContextMenu(undefined);
				break;
		}
	}, []);

	const value = useMemo(() => {
		return {
			tasksContextlMenu,
			handleClick,
		};
	}, [tasksContextlMenu, handleClick]);

	console.log({ tasksContextlMenu });

	return <TasksContextMenuContext.Provider value={value}>{children}</TasksContextMenuContext.Provider>;
};
