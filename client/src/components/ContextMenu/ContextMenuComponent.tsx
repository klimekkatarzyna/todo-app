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
	submenu?: any; // TODO: fix me
	contextMenuOption?: ContextMenuOpion;
}

export const ContextMenuComponent: FC<IContextMenuProps> = ({ contextMenuList, elementId, handleItemClick, submenu, contextMenuOption }) => {
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
				/>
			))}
		</Menu>
	);
};
