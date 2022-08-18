import { IGroup } from '@kkrawczyk/todo-common';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { createContext } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { unGroupeListsAction } from './actions/groups';
import { modalVisibilityState } from './atoms/modal';
import { ContextMenuOpion, QueryKey } from './enums';
import { IData, IHandleContextMenuItemClickProps } from './interfaces/app';

export interface ContextMenuType {
	setContextMenu: React.Dispatch<React.SetStateAction<IData | undefined>>;
	contextualMenu: IData | undefined;
	handleItemClick: ({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => void;
}

export const ContextMenuContext = createContext<ContextMenuType>({} as ContextMenuType);

export const ContextMenuProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const query = useQueryClient();
	const [contextualMenu, setContextMenu] = useState<IData | undefined>();
	const [, setIsVisible] = useRecoilState(modalVisibilityState);

	const { mutateAsync: ungroupListsMutation } = useMutation(unGroupeListsAction, {
		onSuccess: async response => {
			query.setQueryData<IGroup[] | undefined>([QueryKey.groups], (groups: IGroup[] | undefined) =>
				groups?.map(group => (group._id === response.body?._id ? { ...group, lists: [] } : group))
			);
			toast.success('Listy rozgrupowane');
		},
	});

	const handleItemClick = useCallback(async ({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => {
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
			case ContextMenuOpion.ungroup_lists:
				setIsVisible(true);
				await ungroupListsMutation({ _id: data?.elementId, lists: data?.lists });
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

	return <ContextMenuContext.Provider value={value}>{children}</ContextMenuContext.Provider>;
};
