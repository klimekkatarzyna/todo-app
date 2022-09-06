import { IGroup } from '@kkrawczyk/todo-common';
import { FC } from 'react';
import { Menu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { ContextMenuOpion } from '../../enums';
import { IContextMenu, IHandleContextMenuItemClickProps } from '../../interfaces/app';
import { ContextMenuItem } from './ContextMenuItem';

interface IContextMenuProps {
	contextMenuList: IContextMenu[];
	handleItemClick: ({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => void;
	elementDetails: IGroup | undefined;
	submenu?: unknown[];
	contextMenuOption?: ContextMenuOpion;
	mutateAsyncAction?: ({ _id, listId }: IGroup) => void;
}

export const ContextMenuComponent: FC<IContextMenuProps> = ({
	contextMenuList,
	elementDetails,
	handleItemClick,
	submenu,
	contextMenuOption,
	mutateAsyncAction,
}) => {
	return (
		<Menu id={elementDetails?._id as string} theme='light' className={`${contextMenuList?.length ? 'opacity-100' : 'bg-inherit'}`}>
			{contextMenuList?.map(elementItem => (
				<ContextMenuItem
					key={elementItem?.name}
					elementItem={elementItem}
					elementDetails={elementDetails}
					handleItemClick={handleItemClick}
					submenu={submenu}
					contextMenuOption={contextMenuOption}
					mutateAsyncAction={mutateAsyncAction}
				/>
			))}
		</Menu>
	);
};
