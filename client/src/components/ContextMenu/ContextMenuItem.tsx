import { FC, useContext } from 'react';
import { IContextMenu } from '../../interfaces/app';
import { MenuItem } from 'react-contextmenu';
import { ContextMenuContext } from '../../ContextMenuProvider';

interface IContextMenuItem {
	listItem: IContextMenu;
	elementId: string | undefined;
	listId: string | undefined;
}

export const ContextMenuItem: FC<IContextMenuItem> = ({ listItem, elementId, listId }) => {
	const { handleClick } = useContext(ContextMenuContext);

	return (
		<MenuItem
			data={{ ...listItem, elementId, listId }}
			onClick={handleClick}
			className='flex items-center p-2 cursor-pointer hover:bg-lightGrey last:text-red border-t-2 border-solid first:border-none'>
			<div className='icon-style text-grey'>{listItem.icon}</div>
			<span className='text-sm ml-4'>{listItem.name}</span>
		</MenuItem>
	);
};
