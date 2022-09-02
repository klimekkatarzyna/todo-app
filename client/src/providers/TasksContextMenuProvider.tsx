import React, { FC, useCallback, useMemo, useState } from 'react';
import { createContext } from 'react';
import { ContextMenuOpion } from '../enums';
import { IData, IHandleContextMenuItemClickProps } from '../interfaces/app';
import { Importance, ITaskStatus } from '@kkrawczyk/todo-common';
import { useRecoilState } from 'recoil';
import { modalVisibilityState } from '../atoms/modal';
import { useTaskImportance } from '../hooks/tasks/useTaskImportance';
import useTasksStatus from '../hooks/tasks/useTasksStatus';
import { useTasksInMyDay } from '../hooks/tasks/useTasksInMyDay';

export interface TasksContextMenuContextType {
	tasksContextlMenu: IData | undefined;
	setTasksContextMenu: React.Dispatch<React.SetStateAction<IData | undefined>>;
	handleItemClick: ({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => void;
}

export const TasksContextMenuContext = createContext<TasksContextMenuContextType>({} as TasksContextMenuContextType);

export const TasksContextMenuProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [tasksContextlMenu, setTasksContextMenu] = useState<IData | undefined>();
	const [, setIsVisible] = useRecoilState(modalVisibilityState);

	const { taskInMyDayMutation } = useTasksInMyDay();
	const { changeTaskImportanceMutation } = useTaskImportance();
	const { changeTaskStatusMutation } = useTasksStatus();

	const handleItemClick = useCallback(
		async ({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => {
			setTasksContextMenu(data);

			switch (data?.type) {
				case ContextMenuOpion.add_to_myday:
					await taskInMyDayMutation({ _id: data?.elementId, isMyDay: true, parentFolderId: data?.listId });
					setTasksContextMenu(data);
					break;
				case ContextMenuOpion.remove_from_myday:
					await taskInMyDayMutation({ _id: data?.elementId, isMyDay: false, parentFolderId: data?.listId });
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
					await changeTaskStatusMutation({ _id: data?.elementId, parentFolderId: data?.listId, taskStatus: ITaskStatus.complete });
					setTasksContextMenu(data);
					break;
				case ContextMenuOpion.mark_as_uncomplete:
					await changeTaskStatusMutation({ _id: data?.elementId, parentFolderId: data?.listId, taskStatus: ITaskStatus.unComplete });
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
		},
		[changeTaskImportanceMutation, changeTaskStatusMutation, setIsVisible, taskInMyDayMutation]
	);

	const value = useMemo(() => {
		return {
			tasksContextlMenu,
			setTasksContextMenu,
			handleItemClick,
		};
	}, [tasksContextlMenu, handleItemClick]);

	return <TasksContextMenuContext.Provider value={value}>{children}</TasksContextMenuContext.Provider>;
};
