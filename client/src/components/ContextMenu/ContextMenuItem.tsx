import { FC, useCallback } from 'react';
import { IContextMenu, IHandleContextMenuItemClickProps } from '../../interfaces/app';
import { ContextMenuOpion } from '../../enums';
import { Item, Submenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import { ArrowRight } from 'react-feather';

interface IContextMenuItem {
	listItem: IContextMenu;
	elementId: string | undefined;
	handleItemClick: ({ triggerEvent, event, props, data }: IHandleContextMenuItemClickProps) => void;
}

export const ContextMenuItem: FC<IContextMenuItem> = ({ listItem, elementId, handleItemClick }) => {
	const onHandleItemClick = useCallback(({ triggerEvent, event, props, data }) => handleItemClick({ triggerEvent, event, props, data }), []);

	return (
		<>
			<Item
				data={{ ...listItem, elementId }}
				onClick={onHandleItemClick}
				className='cursor-pointer border-t-[1px] border-solid first:border-none'>
				<div className='icon-style text-fontColor'>{listItem.icon}</div>
				<div className='text-sm ml-4 text-fontColor'>{listItem.name}</div>
				{listItem.type === ContextMenuOpion.move_list_to && (
					<Submenu label='' arrow={<ArrowRight className='icon-style text-grey' />}>
						<Item
							data={{ key: 'value 3' }}
							className='cursor-pointer border-t-[1px] border-solid first:border-none'
							onClick={onHandleItemClick}>
							Sub Item 1
						</Item>
						<Item
							data={{ key: 'value 4' }}
							className='cursor-pointer border-t-[1px] border-solid first:border-none'
							onClick={onHandleItemClick}>
							Sub Item 2
						</Item>
					</Submenu>
				)}
			</Item>
		</>
	);
};
