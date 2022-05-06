import React, { FC, useContext } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Folder } from 'react-feather';
import { IGroup } from '@kkrawczyk/todo-common';
import { contextualMenuGroupOpion } from '../../constants';
import { GroupedLists } from './GroupedLists';
import { useDropdown } from '../../hooks/useDropdown';
import { ContextMenuComponent } from '../ContextMenu/ContextMenuComponent';
import { EditGroup } from './EditGroup';
import { ContextMenuContext } from '../../ContextMenuProvider';

interface IGroupProps {
	group: IGroup;
	isNavClosed: boolean;
}

export const Group: FC<IGroupProps> = ({ group, isNavClosed }) => {
	const { handleClick } = useContext(ContextMenuContext);
	const { elementeReference, toggleDropdown, dropdownOpen } = useDropdown();

	return (
		<div ref={elementeReference}>
			<ContextMenuTrigger id={group._id as string}>
				<button onClick={toggleDropdown} className='flex py-2 px-4 cursor-pointer items-center hover:bg-white w-full'>
					<div>
						<Folder strokeWidth={1} className='icon-style text-grey' />
					</div>
					<EditGroup title={group.title} groupId={group._id} isNavClosed={isNavClosed} />
				</button>
			</ContextMenuTrigger>
			{dropdownOpen && <GroupedLists />}
			<ContextMenuComponent contextMenuList={contextualMenuGroupOpion} elementId={group?._id} handleClick={handleClick} />
		</div>
	);
};
