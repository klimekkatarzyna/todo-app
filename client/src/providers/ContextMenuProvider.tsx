import { IGroup } from '@kkrawczyk/todo-common';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { createContext } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import { unGroupeListsAction } from '../actions/groups';
import { ContextMenuOpion, QueryKey } from '../enums';
import { useModal } from '../hooks/useModal';
import { IData, IHandleContextMenuItemClickProps } from '../interfaces/app';

export interface ContextMenuType {
	setContextMenu: React.Dispatch<React.SetStateAction<IData | undefined>>;
	contextualMenu: IData | undefined;
	handleItemClick: ({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => void;
}

export const ContextMenuContext = createContext<ContextMenuType>({} as ContextMenuType);

export const ContextMenuProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const query = useQueryClient();
	const [contextualMenu, setContextMenu] = useState<IData | undefined>();
	const { showModal } = useModal();

	const { mutateAsync: ungroupListsMutation } = useMutation(unGroupeListsAction, {
		onSuccess: async response => {
			query.setQueryData<IGroup[] | undefined>([QueryKey.groups], (groups: IGroup[] | undefined) =>
				groups?.map(group => (group._id === response.data?._id ? { ...group, lists: [] } : group))
			);
			toast.success('Listy rozgrupowane');
		},
	});

	const handleItemClick = useCallback(async ({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => {
		setContextMenu(data);

		switch (data?.type) {
			case ContextMenuOpion.remove_list:
				setContextMenu(data);
				showModal({ modal: ContextMenuOpion.remove_list });
				break;
			case ContextMenuOpion.remove_group:
				showModal({ modal: ContextMenuOpion.remove_group });
				setContextMenu(data);
				break;
			case ContextMenuOpion.ungroup_lists:
				showModal({ modal: ContextMenuOpion.ungroup_lists });
				await ungroupListsMutation({ _id: data?.elementId, lists: data?.lists });
				setContextMenu(data);
				break;
			case ContextMenuOpion.edit_group_name:
				setContextMenu(data);
				break;
			case ContextMenuOpion.sharing_options:
				showModal({ modal: ContextMenuOpion.sharing_options });
				setContextMenu(data);
				break;
			case ContextMenuOpion.move_list_to:
				showModal({ modal: ContextMenuOpion.move_list_to });
				setContextMenu(data);
				break;
			case ContextMenuOpion.leave_list:
				showModal({ modal: ContextMenuOpion.leave_list });
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
