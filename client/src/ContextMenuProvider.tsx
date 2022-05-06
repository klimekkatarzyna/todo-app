import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { createContext } from 'react';
import { ContextMenuOpion } from './enums';
import { IContextMenu } from './interfaces/app';
import { ModalVisibilityContext } from './ModalVisibilityProvider';

export interface ContextMenuType {
	contextualMenu: IData | undefined;
	handleClick: (event: React.ChangeEvent<HTMLInputElement>, data: any) => void;
}

export const ContextMenuContext = createContext<ContextMenuType>({} as ContextMenuType);

type ElementId = {
	elementId: string;
};

export interface IData extends IContextMenu, ElementId {}

interface IContextMenuProvider {
	children: React.ReactNode;
}

export const ContextMenuProvider: FC<IContextMenuProvider> = ({ children }) => {
	const [contextualMenu, setContextualMenu] = useState<IData | undefined>();
	const { onShow } = useContext(ModalVisibilityContext);

	const handleClick = useCallback((event: React.ChangeEvent<HTMLInputElement>, data: IData) => {
		setContextualMenu(data);
		onShow();

		switch (data?.type) {
			case ContextMenuOpion.remove_list:
				setContextualMenu(data);
				break;
			case ContextMenuOpion.remove_group:
				setContextualMenu(data);
				break;
			case ContextMenuOpion.remove_task:
				setContextualMenu(data);
				break;
			case ContextMenuOpion.add_to_myday:
				setContextualMenu(data);
				break;
			case ContextMenuOpion.mark_as_important:
				setContextualMenu(data);
				break;
			case ContextMenuOpion.mark_as_complete:
				setContextualMenu(data);
				break;
			case ContextMenuOpion.edit_group_name:
				setContextualMenu(data);
				break;
			case ContextMenuOpion.sharing_options:
				setContextualMenu(data);
				break;
			case ContextMenuOpion.leave_list:
				setContextualMenu(data);
				break;
			default:
				setContextualMenu(undefined);
				break;
		}
	}, []);

	const value = useMemo(() => {
		return {
			contextualMenu,
			handleClick,
		};
	}, [contextualMenu, handleClick]);

	console.log({ contextualMenu });

	return <ContextMenuContext.Provider value={value}>{children}</ContextMenuContext.Provider>;
};
