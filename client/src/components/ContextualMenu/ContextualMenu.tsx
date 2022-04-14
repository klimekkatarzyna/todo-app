import { FC } from 'react';
import { IContextualMenu } from '../../interfaces/app';
import { ContextualMenuItem } from './ContextualMenuItem';
import { ContextMenu } from 'react-contextmenu';

interface IContextualMenuProps {
	contextualMenuList: IContextualMenu[];
	elementId: string | undefined;
}

export const ContextualMenu: FC<IContextualMenuProps> = ({ contextualMenuList, elementId }) => {
	return (
		<ContextMenu
			id={elementId as string}
			className='flex flex-col bg-white absolute top-5 max-w-280 z-10 text-fontColor right-[-50px] w-80 shadow-md'>
			{contextualMenuList.map(listItem => (
				<ContextualMenuItem key={listItem?.name} listItem={listItem} elementId={elementId} />
			))}
		</ContextMenu>
	);
};
