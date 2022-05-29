import { FC, useCallback } from 'react';
import { IContextMenu, IHandleContextMenuItemClickProps } from '../../interfaces/app';
import { ContextMenuOpion } from '../../enums';
import { Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { SubmenuComponent } from './Submenu';

interface IContextMenuItem {
	listItem: IContextMenu;
	elementId: string | undefined;
	handleItemClick: ({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => void;
	submenu?: any; // TODO: fix me
	contextMenuOption: ContextMenuOpion | undefined;
}

export const ContextMenuItem: FC<IContextMenuItem> = ({ listItem, elementId, handleItemClick, submenu, contextMenuOption }) => {
	const onHandleItemClick = useCallback(({ triggerEvent, event, props, data }) => handleItemClick({ triggerEvent, event, props, data }), []);

	return (
		<>
			<Item
				data={{ ...listItem, elementId }}
				onClick={onHandleItemClick}
				className='cursor-pointer border-t-[1px] border-solid first:border-none'>
				<div className='icon-style text-fontColor'>{listItem.icon}</div>
				<div className='text-sm ml-4 text-fontColor'>{listItem.name}</div>
				<SubmenuComponent listItem={listItem} submenu={submenu} contextMenuOption={contextMenuOption} />
			</Item>
		</>
	);
};
