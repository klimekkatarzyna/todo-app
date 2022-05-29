import React, { FC, useCallback } from 'react';
import { Item, Submenu } from 'react-contexify';
import { ArrowRight, Folder } from 'react-feather';
import { ContextMenuOpion } from '../../enums';
import { IContextMenu } from '../../interfaces/app';

interface ISubmenuComponentProps {
	listItem: IContextMenu;
	submenu?: any; // TODO: fix me
	contextMenuOption: ContextMenuOpion | undefined;
}

export const SubmenuComponent: FC<ISubmenuComponentProps> = ({ listItem, contextMenuOption, submenu }) => {
	const onHandleSubitemItemClick = useCallback(({ data }) => {
		console.log(data);
	}, []);

	return (
		<>
			{listItem.type === contextMenuOption && (
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
