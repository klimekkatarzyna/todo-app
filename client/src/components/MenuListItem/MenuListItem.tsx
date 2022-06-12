import { FC, useMemo, memo, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { contextualMenuSecountOpion, contextualMenuSecountOpionMembers } from '../../constants';
import { IGroup, IList, ITask } from '@kkrawczyk/todo-common';
import { ROUTE, QueryKey, SideMenu, ContextMenuOpion } from '../../enums';
import { ContextMenuComponent } from '../ContextMenu/ContextMenuComponent';
import { useSharingData } from '../../hooks/useSharingData';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTasksOfCurrentListAction } from '../../actions/tasks';
import { Sun, Star, List, Calendar, User, Users, Home } from 'react-feather';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { buildUrl } from '../../utils/paths';
import { useShowMenuContexify } from '../../hooks/useShowMenuContexify';
import { addListToGroupAction, getGroups } from '../../actions/groups';
import toast from 'react-hot-toast';
import { IQueryError } from '../../interfaces/app';
import { useGenerateMenuIcon } from '../../hooks/useGenerateMenuIcon';

interface IMenuListItem {
	listItem: IList | undefined;
	isNavClosed?: boolean | undefined;
	isMainMenu?: boolean;
}

const MenuListItemComponent: FC<IMenuListItem> = ({ listItem, isNavClosed, isMainMenu = false }) => {
	const query = useQueryClient();
	const { handleItemClick } = useContext(ContextMenuContext);
	const { displayMenu } = useShowMenuContexify(listItem?._id);
	const { icon } = useGenerateMenuIcon(listItem);

	const { isOwner } = useSharingData(listItem?.userId);
	const { data } = useQuery<ITask[] | undefined>(
		[QueryKey.tasksOfCurrentList, listItem?._id],
		() => getTasksOfCurrentListAction({ parentFolderId: listItem?._id }),
		{ enabled: !!listItem?._id }
	);

	const redirectUrl = useMemo(
		() => (listItem?.isMainList ? listItem?.url : buildUrl(ROUTE.listsDetails, { listId: listItem?._id || '' })),
		[listItem]
	) as string;

	const contextMenuList = useMemo(() => (isOwner ? contextualMenuSecountOpion : contextualMenuSecountOpionMembers), [isOwner]);

	const { data: groupsList } = useQuery<IGroup[] | undefined>(QueryKey.groups, getGroups);

	const { mutateAsync } = useMutation(addListToGroupAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.groups]);
			toast.success('Lista dodana do grupy');
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	const groupsWithoutAddedList = useMemo(
		() => groupsList?.filter(group => !group.lists?.includes(listItem?._id || '') && group),
		[groupsList, listItem]
	);

	return (
		<NavLink to={redirectUrl} className='no-underline' activeClassName='bg-activeMenuItem'>
			<div onContextMenu={displayMenu}>
				<div className={'flex align-center px-4 py-2 text-sm hover:bg-white'}>
					<div>{icon || <List className='mr-2 stroke-blue icon-style' />}</div>
					<div className={`text-sm text-fontColor ml-2 break-words ${isNavClosed ? 'hidden' : 'flex'}`}>{listItem?.title}</div>
					{!!listItem?.members?.length && <Users className='ml-2 icon-style' />}
					{!!data?.length && <div className={`text-sm text-fontColor ml-auto ${isNavClosed ? 'hidden' : 'flex'}`}>{data?.length}</div>}
				</div>
			</div>
			<ContextMenuComponent
				contextMenuList={isMainMenu ? [] : contextMenuList}
				elementDetails={listItem}
				handleItemClick={handleItemClick}
				submenu={groupsWithoutAddedList}
				contextMenuOption={ContextMenuOpion.move_list_to}
				mutateAsyncAction={mutateAsync}
			/>
		</NavLink>
	);
};

export const MenuListItem = memo(MenuListItemComponent);
