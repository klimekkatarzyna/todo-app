import { FC } from 'react';
import { IContextMenu } from '../../interfaces/app';
import { ContextMenuItem } from './ContextMenuItem';
import { ContextMenu } from 'react-contextmenu';

interface IContextMenuProps {
	contextMenuList: IContextMenu[];
	elementId: string | undefined;
}

export const ContextMenuComponent: FC<IContextMenuProps> = ({ contextMenuList, elementId }) => {
	return (
		<ContextMenu
			id={elementId as string}
			className='flex flex-col bg-white absolute top-5 max-w-280 z-10 text-fontColor right-[-50px] w-80 shadow-md'>
			{contextMenuList.map(listItem => (
				<ContextMenuItem key={listItem?.name} listItem={listItem} elementId={elementId} />
			))}
		</ContextMenu>
	);
};
