import { FC, useContext } from 'react';
import { IContextualMenu } from '../../interfaces/app';
import { MenuItem } from 'react-contextmenu';
import { ContextualMenuContext } from '../../ContextualMenuProvider';

interface IContextualMenuItem {
	listItem: IContextualMenu;
	elementId: string | undefined;
}

export const ContextualMenuItem: FC<IContextualMenuItem> = ({ listItem, elementId }) => {
	const { handleClick } = useContext(ContextualMenuContext);

	return (
		<MenuItem
			data={{ ...listItem, elementId }}
			onClick={handleClick}
			className='flex items-center p-2 cursor-pointer hover:bg-lightGrey last:text-red border-t-2 border-solid first:border-none'>
			<div className='icon-style text-grey'>{listItem.icon}</div>
			<span className='text-sm ml-4'>{listItem.name}</span>
		</MenuItem>
	);
};
