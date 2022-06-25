import { FC, useCallback } from 'react';
import { IContextMenu, IHandleContextMenuItemClickProps } from '../../interfaces/app';
import { ContextMenuOpion } from '../../enums';
import { Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { SubmenuComponent } from './Submenu';
import { IGroup } from '@kkrawczyk/todo-common';

interface IContextMenuItem {
	listItem: IContextMenu;
	elementDetails: any | undefined;
	handleItemClick: ({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => void;
	submenu?: unknown[];
	contextMenuOption: ContextMenuOpion | undefined;
	mutateAsyncAction?: ({ _id, listId }: IGroup) => void;
}

export const ContextMenuItem: FC<IContextMenuItem> = ({
	listItem,
	elementDetails,
	handleItemClick,
	submenu,
	contextMenuOption,
	mutateAsyncAction,
}) => {
	const onHandleItemClick = useCallback(({ triggerEvent, event, props, data }) => handleItemClick({ triggerEvent, event, props, data }), []);

	return (
		<>
			<Item
				data={{ ...listItem, elementId: elementDetails?._id, lists: elementDetails, listId: elementDetails?.parentFolderId }}
				onClick={onHandleItemClick}
				className='cursor-pointer border-t-[1px] border-solid first:border-none'>
				<div className='icon-style text-fontColor'>{listItem.icon}</div>
				<div className='text-sm ml-4 text-fontColor'>{listItem.name}</div>
				{!!submenu?.length && (
					<SubmenuComponent
						listItem={listItem}
						submenu={submenu}
						contextMenuOption={contextMenuOption}
						elementId={elementDetails?._id}
						mutateAsyncAction={mutateAsyncAction}
					/>
				)}
			</Item>
		</>
	);
};
