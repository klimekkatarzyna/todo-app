import React, { FC, useContext, useEffect, useMemo } from 'react';
import { Folder } from 'react-feather';
import { IGroup } from '@kkrawczyk/todo-common';
import { contextualMenuGroupedLists, contextualMenuGroup } from '../../constants';
import { GroupedLists } from './GroupedLists';
import { useDropdown } from '../../hooks/useDropdown';
import { ContextMenuComponent } from '../ContextMenu/ContextMenuComponent';
import { EditGroup } from './EditGroup';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { useShowMenuContexify } from '../../hooks/useShowMenuContexify';
import { useSetRecoilState } from 'recoil';
import { groupState } from '../../atoms/group';

interface IGroupProps {
	group: IGroup;
	isNavClosed: boolean | undefined;
}

export const Group: FC<IGroupProps> = ({ group, isNavClosed }) => {
	const { handleItemClick } = useContext(ContextMenuContext);
	const { displayMenu } = useShowMenuContexify(group._id);
	const { elementeReference, toggleDropdown, dropdownOpen } = useDropdown();
	const setGroupDetails = useSetRecoilState(groupState);

	const contextMenuList = useMemo(() => (!!group.lists?.length ? contextualMenuGroupedLists : contextualMenuGroup), [group]);

	useEffect(() => {
		setGroupDetails(group);
	}, [group]);

	return (
		<div ref={elementeReference}>
			<div onContextMenu={displayMenu}>
				<button onClick={toggleDropdown} className='flex py-2 px-4 cursor-pointer items-center hover:bg-white w-full'>
					<div>
						<Folder strokeWidth={1} className='icon-style text-grey' />
					</div>
					<EditGroup title={group.title} groupId={group._id} isNavClosed={isNavClosed} />
				</button>
			</div>
			{dropdownOpen && <GroupedLists group={group} />}
			<ContextMenuComponent contextMenuList={contextMenuList} elementDetails={group} handleItemClick={handleItemClick} />
		</div>
	);
};
