import { IGroup } from '@kkrawczyk/todo-common';
import React, { FC, useCallback } from 'react';
import { Item, Submenu } from 'react-contexify';
import { ArrowRight, Folder } from 'react-feather';
import { ContextMenuOpion } from '../../enums';
import { IContextMenu } from '../../interfaces/app';

interface ISubmenuComponentProps {
	elementItem: IContextMenu;
	submenu?: unknown[];
	contextMenuOption: ContextMenuOpion | undefined;
	elementId: string | undefined;
	mutateAsyncAction?: ({ _id, listId }: IGroup) => void;
}

export const SubmenuComponent: FC<ISubmenuComponentProps> = ({ elementItem, contextMenuOption, submenu, elementId, mutateAsyncAction }) => {
	const onHandleSubitemItemClick = useCallback(
		({ data }) => {
			mutateAsyncAction?.({ _id: data._id, listId: elementId });
		},
		[elementId]
	);

	return (
		<>
			{elementItem.type === contextMenuOption && (
				<Submenu label='' arrow={<ArrowRight className='icon-style text-grey' />}>
					{submenu?.map((item: any, index: number) => (
						<Item
							data={{ ...item }}
							key={index}
							className='cursor-pointer border-t-[1px] border-solid first:border-none'
							onClick={onHandleSubitemItemClick}>
							<Folder strokeWidth={1} className='icon-style text-grey' />
							<div className='ml-4'>{item.title}</div>
						</Item>
					))}
				</Submenu>
			)}
		</>
	);
};
