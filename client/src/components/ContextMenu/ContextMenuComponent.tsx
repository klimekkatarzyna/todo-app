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
	elementId: string | undefined;
	submenu?: unknown[];
	contextMenuOption?: ContextMenuOpion;
	mutateAsyncAction?: ({ _id, listId }: IGroup) => void;
}

export const ContextMenuComponent: FC<IContextMenuProps> = ({
	contextMenuList,
	elementId,
	handleItemClick,
	submenu,
	contextMenuOption,
	mutateAsyncAction,
}) => {
	return (
		<Menu id={elementId as string} theme='light'>
			{contextMenuList.map(listItem => (
				<ContextMenuItem
					key={listItem?.name}
					listItem={listItem}
					elementId={elementId}
					handleItemClick={handleItemClick}
					submenu={submenu}
					contextMenuOption={contextMenuOption}
					mutateAsyncAction={mutateAsyncAction}
				/>
			))}
		</Menu>
	);
};
