import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { createContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { changeTaskImportanceAction, taskInMyDayAction } from './actions/tasks';
import { ContextMenuOpion, QueryKey } from './enums';
import { IContextMenu } from './interfaces/app';
import { ModalVisibilityContext } from './ModalVisibilityProvider';
import toast from 'react-hot-toast';
import { Importance } from '@kkrawczyk/todo-common';
import { useTasks } from './hooks/useTasks';

export interface ContextMenuType {
	setContextMenu: React.Dispatch<React.SetStateAction<IData | undefined>>;
	contextualMenu: IData | undefined;
	handleClick: (event: React.ChangeEvent<HTMLInputElement>, data: any) => void;
}

export const ContextMenuContext = createContext<ContextMenuType>({} as ContextMenuType);

type ElementId = {
	elementId: string;
	listId: string;
};

export interface IData extends IContextMenu, ElementId {}

interface IContextMenuProvider {
	children: React.ReactNode;
}

export const ContextMenuProvider: FC<IContextMenuProvider> = ({ children }) => {
	const [contextualMenu, setContextMenu] = useState<IData | undefined>();
	const { onShow } = useContext(ModalVisibilityContext);
	const query = useQueryClient();

	const { removeTaskMutation, onMarkTaskAsCompleted, onMarkTaskAsInCompleted } = useTasks();

	const { mutate: taskInMyDayMutation } = useMutation(taskInMyDayAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.tasksOfCurrentList]);
			query.invalidateQueries([QueryKey.getTask]);
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
		setContextMenu(data);
		onShow();

		switch (data?.type) {
			case ContextMenuOpion.add_to_myday:
				taskInMyDayMutation({ _id: data?.elementId, isMyDay: true });
				break;
			case ContextMenuOpion.remove_from_myday:
				taskInMyDayMutation({ _id: data?.elementId, isMyDay: false });
				break;
			case ContextMenuOpion.mark_as_important:
				changeTaskImportanceMutation({ _id: data?.elementId, parentFolderId: data?.listId, importance: Importance.high });
				break;
			case ContextMenuOpion.remove_importance:
				changeTaskImportanceMutation({ _id: data?.elementId, parentFolderId: data?.listId, importance: Importance.normal });
				break;
			case ContextMenuOpion.mark_as_complete:
				onMarkTaskAsCompleted(data?.elementId);
				break;
			case ContextMenuOpion.mark_as_incomplete:
				onMarkTaskAsInCompleted(data?.elementId);
				break;
			case ContextMenuOpion.remove_list:
				setContextMenu(data);
				break;
			case ContextMenuOpion.remove_group:
				setContextMenu(data);
				break;
			case ContextMenuOpion.remove_task:
				setContextMenu(data);
				break;
			case ContextMenuOpion.mark_as_complete:
				setContextMenu(data);
				break;
			case ContextMenuOpion.edit_group_name:
				setContextMenu(data);
				break;
			case ContextMenuOpion.sharing_options:
				setContextMenu(data);
				break;
			case ContextMenuOpion.leave_list:
				setContextMenu(data);
				break;
			default:
				setContextMenu(undefined);
				break;
		}
	}, []);

	const value = useMemo(() => {
		return {
			contextualMenu,
			setContextMenu,
			handleClick,
		};
	}, [contextualMenu, handleClick]);

	console.log({ contextualMenu });

	return <ContextMenuContext.Provider value={value}>{children}</ContextMenuContext.Provider>;
};
