import React, { FC, useCallback, useMemo, useState } from 'react';
import { createContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { changeTaskImportanceAction, taskInMyDayAction } from '../actions/tasks';
import { ContextMenuOpion, QueryKey } from '../enums';
import { IContextMenu } from '../interfaces/app';
import toast from 'react-hot-toast';
import { Importance } from '@kkrawczyk/todo-common';
import { useTasks } from '../hooks/useTasks';
import { useRecoilState } from 'recoil';
import { modalVisibilityState } from '../atoms/modal';

export interface TasksContextMenuContextType {
	tasksContextlMenu: IData | undefined;
	setTasksContextMenu: React.Dispatch<React.SetStateAction<IData | undefined>>;
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
	const [isVisible, setIsVisible] = useRecoilState(modalVisibilityState);
	const query = useQueryClient();

	const { onMarkTaskAsCompleted, onMarkTaskAsInCompleted } = useTasks();

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

	const handleClick = useCallback(async (event: React.ChangeEvent<HTMLInputElement>, data: IData) => {
		setTasksContextMenu(data);

		switch (data?.type) {
			case ContextMenuOpion.add_to_myday:
				await taskInMyDayMutation({ _id: data?.elementId, isMyDay: true });
				setTasksContextMenu(data);
				break;
			case ContextMenuOpion.remove_from_myday:
				await taskInMyDayMutation({ _id: data?.elementId, isMyDay: false });
				setTasksContextMenu(data);
				break;
			case ContextMenuOpion.mark_as_important:
				await changeTaskImportanceMutation({ _id: data?.elementId, parentFolderId: data?.listId, importance: Importance.high });
				setTasksContextMenu(data);
				break;
			case ContextMenuOpion.remove_importance:
				await changeTaskImportanceMutation({ _id: data?.elementId, parentFolderId: data?.listId, importance: Importance.normal });
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
				setIsVisible(true);
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
			setTasksContextMenu,
			handleClick,
		};
	}, [tasksContextlMenu, handleClick]);

	return <TasksContextMenuContext.Provider value={value}>{children}</TasksContextMenuContext.Provider>;
};
