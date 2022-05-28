import React, { FC, useCallback, useMemo, useState } from 'react';
import { createContext } from 'react';
import { useRecoilState } from 'recoil';
import { modalVisibilityState } from './atoms/modal';
import { ContextMenuOpion } from './enums';
import { IData, IHandleContextMenuItemClickProps } from './interfaces/app';

export interface ContextMenuType {
	setContextMenu: React.Dispatch<React.SetStateAction<IData | undefined>>;
	contextualMenu: IData | undefined;
	handleItemClick: ({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => void;
}

export const ContextMenuContext = createContext<ContextMenuType>({} as ContextMenuType);

interface IContextMenuProvider {
	children: React.ReactNode;
}

export const ContextMenuProvider: FC<IContextMenuProvider> = ({ children }) => {
	const [contextualMenu, setContextMenu] = useState<IData | undefined>();
	const [isVisible, setIsVisible] = useRecoilState(modalVisibilityState);

	const handleItemClick = useCallback(({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => {
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
			case ContextMenuOpion.move_list_to:
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
			handleItemClick,
		};
	}, [contextualMenu, handleItemClick]);

	console.log({ contextualMenu });

	return <ContextMenuContext.Provider value={value}>{children}</ContextMenuContext.Provider>;
};
