import React, { FC } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Folder } from 'react-feather';
import { IGroup } from '@kkrawczyk/todo-common';
import { contextualMenuGroupOpion } from '../../constants';
import { GroupedLists } from './GroupedLists';
import { useDropdown } from '../../hooks/useDropdown';
import { ContextualMenu } from '../ContextualMenu/ContextualMenu';
import { EditGroup } from './EditGroup';

interface IGroupProps {
	group: IGroup;
	isNavClosed: boolean;
}

export const Group: FC<IGroupProps> = ({ group, isNavClosed }) => {
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
			<ContextualMenu contextualMenuList={contextualMenuGroupOpion} elementId={group?._id} />
		</div>
	);
};
