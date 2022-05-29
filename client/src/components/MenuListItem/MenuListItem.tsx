import { FC, useMemo, memo, useContext, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { contextualMenuSecountOpion, contextualMenuSecountOpionMembers } from '../../constants';
import { IGroup, IList, ITask } from '@kkrawczyk/todo-common';
import { ROUTE, QueryKey, SideMenu, ContextMenuOpion } from '../../enums';
import { ContextMenuComponent } from '../ContextMenu/ContextMenuComponent';
import { useSharingData } from '../../hooks/useSharingData';
import { useQuery } from 'react-query';
import { getTasksOfCurrentListAction } from '../../actions/tasks';
import { Sun, Star, List, Calendar, User, Users, Home } from 'react-feather';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { buildUrl } from '../../utils/paths';
import { useShowMenuContexify } from '../../hooks/useShowMenuContexify';
import { getGroups } from '../../actions/groups';

interface IMenuListItem {
	listItem: IList;
	isNavClosed?: boolean | undefined;
}

const MenuListItemComponent: FC<IMenuListItem> = ({ listItem, isNavClosed }) => {
	const { handleItemClick } = useContext(ContextMenuContext);
	const { displayMenu } = useShowMenuContexify(listItem._id);

	const icon = useMemo(
		() =>
			(listItem.url === `/${SideMenu.myDay}` && <Sun className='icon-style' />) ||
			(listItem.url === `/${SideMenu.important}` && <Star className='icon-style' />) ||
			(listItem.url === `/${SideMenu.planned}` && <Calendar className='icon-style stroke-blue' />) ||
			(listItem.url === `/${SideMenu.assigned}` && <User className='icon-style stroke-green' />) ||
			(listItem.url === `/${SideMenu.inbox}` && <Home className='icon-style stroke-red' />),
		[listItem]
	);
	const { isOwner } = useSharingData(listItem?.userId);
	const { data } = useQuery<ITask[] | undefined>(
		[QueryKey.tasksOfCurrentList, listItem._id],
		() => getTasksOfCurrentListAction({ parentFolderId: listItem._id }),
		{ enabled: !!listItem._id }
	);

	const redirectUrl = useMemo(
		() => (listItem?.isMainList ? listItem?.url : buildUrl(ROUTE.listsDetails, { listId: listItem?._id || '' })),
		[listItem]
	) as string;
	const contextMenuList = useMemo(() => (isOwner ? contextualMenuSecountOpion : contextualMenuSecountOpionMembers), [isOwner]);

	const { data: groupsList } = useQuery<IGroup[] | undefined>(QueryKey.groups, getGroups);

	return (
		<NavLink to={redirectUrl} className='no-underline' activeClassName='bg-activeMenuItem'>
			<div onContextMenu={displayMenu}>
				<div className={'flex align-center px-4 py-2 text-sm hover:bg-white'}>
					<div>{icon || <List className='mr-2 stroke-blue icon-style' />}</div>
					<div className={`text-sm text-fontColor ml-2 break-words ${isNavClosed ? 'hidden' : 'flex'}`}>{listItem?.title}</div>
					{!!listItem.members?.length && <Users className='ml-2 icon-style' />}
					{!!data?.length && <div className={`text-sm text-fontColor ml-auto ${isNavClosed ? 'hidden' : 'flex'}`}>{data?.length}</div>}
				</div>
			</div>
			<ContextMenuComponent
				contextMenuList={contextMenuList}
				elementId={listItem?._id}
				handleItemClick={handleItemClick}
				submenu={groupsList}
				contextMenuOption={ContextMenuOpion.move_list_to}
			/>
		</NavLink>
	);
};

export const MenuListItem = memo(MenuListItemComponent);
