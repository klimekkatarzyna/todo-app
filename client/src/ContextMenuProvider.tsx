import React, { FC, useCallback, useMemo, useState } from 'react';
import { createContext } from 'react';
import { useRecoilState } from 'recoil';
import { modalVisibilityState } from './atoms/modal';
import { ContextMenuOpion } from './enums';
import { IContextMenu } from './interfaces/app';

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
	const [isVisible, setIsVisible] = useRecoilState(modalVisibilityState);

	const handleClick = useCallback((event: React.ChangeEvent<HTMLInputElement>, data: IData) => {
		setContextMenu(data);

		switch (data?.type) {
			case ContextMenuOpion.remove_list:
				setContextMenu(data);
				setIsVisible(true);
				break;
			case ContextMenuOpion.remove_group:
				setIsVisible(true);
				setContextMenu(data);
				break;
			case ContextMenuOpion.edit_group_name:
				setContextMenu(data);
				break;
			case ContextMenuOpion.sharing_options:
				setIsVisible(true);
				setContextMenu(data);
				break;
			case ContextMenuOpion.leave_list:
				setIsVisible(true);
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

	return <ContextMenuContext.Provider value={value}>{children}</ContextMenuContext.Provider>;
};
