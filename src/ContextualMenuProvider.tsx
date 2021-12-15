import React, { FC, useCallback, useMemo, useState } from 'react';

import { createContext } from 'react';
import { ContextualMenuOpion } from './enums';
import { IContextualMenu } from './interfaces/list';

export interface ContextualMenuType {
	contextualMenu: any;
	handleClick: (event: React.ChangeEvent<HTMLInputElement>, data: any) => void;
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
	const [contextualMenu, setContextualMenu] = useState<IData | unknown>();

	const handleClick = useCallback((event: React.ChangeEvent<HTMLInputElement>, data: IData) => {
		setContextualMenu(data);

		switch (data.type) {
			case ContextualMenuOpion.remove_list:
				setContextualMenu(data);
				break;
			case ContextualMenuOpion.remove_group:
				setContextualMenu(data);
				break;
			case ContextualMenuOpion.remove_task:
				setContextualMenu(data);
				break;
			case ContextualMenuOpion.edit_group_name:
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

	return <ContextualMenuContext.Provider value={value}>{children}</ContextualMenuContext.Provider>;
};
