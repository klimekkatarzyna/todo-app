import React, { FC, useCallback, useMemo, useState } from 'react';

import { createContext } from 'react';
import { useGroup } from './components/Group/useGroup';
import useList from './components/List/useList';
import { useTask } from './components/Tasks/useTask';
import { ContextualMenuOpion } from './enums';
import { IContextualMenu } from './interfaces/list';

export interface ContextualMenuType {
	contextualMenu: any;
	handleClick: (event: React.ChangeEvent<HTMLInputElement>, data: any) => Promise<void>;
}

export const ContextualMenuContext = createContext<ContextualMenuType>({} as ContextualMenuType);

type ElementId = {
	elementId: string;
};

interface IData extends IContextualMenu, ElementId {}

interface IContextualMenuProvider {
	children: React.ReactNode;
}

export const ContextualMenuProvider: FC<IContextualMenuProvider> = ({ children }) => {
	const [contextualMenu, setContextualMenu] = useState<IData>();

	const { mutateRemoveList } = useList();
	const { mutateRemoveTask } = useTask();
	const { deleteGroupMutate, editGroupMutate } = useGroup();

	const handleClick = useCallback(async (event: React.ChangeEvent<HTMLInputElement>, data: IData): Promise<void> => {
		setContextualMenu(data);
		console.log(data);
		try {
			switch (data.type) {
				case ContextualMenuOpion.remove_list:
					await mutateRemoveList(data.elementId);
					break;
				case ContextualMenuOpion.remove_group:
					await deleteGroupMutate(data.elementId);
					break;
				case ContextualMenuOpion.remove_task:
					await mutateRemoveTask(data.elementId);
					break;
				case ContextualMenuOpion.edit_group_name:
					await editGroupMutate(data.elementId);
					break;
				default:
					setContextualMenu(undefined);
					break;
			}
		} catch {
			//TODO: handle error & show notificayion
		}
	}, []);

	const value = useMemo(() => {
		return {
			contextualMenu,
			handleClick,
		};
	}, [contextualMenu, handleClick]);

	return <ContextualMenuContext.Provider value={value}>{children}</ContextualMenuContext.Provider>;
};
