import { FC, useMemo, memo, useContext, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { contextualMenuSecountOpion, contextualMenuSecountOpionMembers } from '../../constants';
import { IGroup, IList, ITask, SortTaskString } from '@kkrawczyk/todo-common';
import { ROUTE, QueryKey, ContextMenuOpion } from '../../enums';
import { ContextMenuComponent } from '../ContextMenu/ContextMenuComponent';
import { useSharingData } from '../../hooks/useSharingData';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getTasksOfCurrentListAction } from '../../api/tasks';
import { List, Users } from 'react-feather';
import { ContextMenuContext } from '../../providers/ContextMenuProvider';
import { buildUrl } from '../../utils/paths';
import { useShowMenuContexify } from '../../hooks/useShowMenuContexify';
import { addListToGroupAction, getGroups } from '../../api/groups';
import toast from 'react-hot-toast';
import { useGenerateMenuIcon } from '../../hooks/useGenerateMenuIcon';
import { useRecoilState } from 'recoil';
import { mobileNavVisibilityState } from '../../atoms';
import { IUseParams } from '../../interfaces/app';
import { useTranslation } from 'react-i18next';

interface IMenuListItem {
	listItem: IList | undefined;
	isNavClosed?: boolean | undefined;
	isMainMenu?: boolean;
}

const MenuListItemComponent: FC<IMenuListItem> = ({ listItem, isNavClosed, isMainMenu = false }) => {
	const { t } = useTranslation();
	const query = useQueryClient();
	const { handleItemClick } = useContext(ContextMenuContext);
	const { displayMenu } = useShowMenuContexify(listItem?._id, isMainMenu);
	const { icon } = useGenerateMenuIcon(listItem);
	const { isOwner } = useSharingData(listItem?.userId);
	const { listId } = useParams<IUseParams>();

	useEffect(() => {
		sessionStorage.setItem('taskSortedType', sessionStorage.getItem('taskSortedType') as SortTaskString);
	}, [listId]);

	const { data } = useQuery<ITask[] | undefined>(
		[QueryKey.tasksOfCurrentList, listItem?._id],
		() => getTasksOfCurrentListAction({ parentFolderId: listItem?._id, sortType: sessionStorage.getItem('taskSortedType') as SortTaskString }),
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
			toast.success(t('add-list-to-group-success'));
		},
	});

	const groupsWithoutAddedList = useMemo(
		() => groupsList?.filter(group => !group.lists?.includes(listItem?._id || '') && group),
		[groupsList, listItem]
	);

	const [, setIsVisible] = useRecoilState(mobileNavVisibilityState);

	return (
		<NavLink to={redirectUrl} className={({ isActive }) => `list-link ${isActive ? 'bg-activeMenuItem' : 'bg-none'}`}>
			<div onContextMenu={displayMenu} onClick={() => setIsVisible(false)}>
				<div className={'flex align-center px-4 py-2 hover:bg-white text-base md:text-sm'}>
					<div>{icon || <List className={`mr-2 stroke-${listItem?.themeColor} icon-style`} />}</div>
					<div
						className={`list-title text-${listItem?.themeColor} ml-2 break-words ${
							isNavClosed ? 'hidden' : 'flex'
						} text-base md:text-sm`}>
						{listItem?.title}
					</div>
					{!!listItem?.members?.length && <Users className='ml-2 icon-style' />}
					{!!data?.length && (
						<div className={` text-fontColor ml-auto ${isNavClosed ? 'hidden' : 'flex'} text-base md:text-sm`}>{data?.length}</div>
					)}
				</div>
			</div>
			{!isMainMenu && (
				<ContextMenuComponent
					contextMenuList={contextMenuList}
					elementDetails={listItem}
					handleItemClick={handleItemClick}
					submenu={groupsWithoutAddedList}
					contextMenuOption={ContextMenuOpion.move_list_to}
					mutateAsyncAction={mutateAsync}
				/>
			)}
		</NavLink>
	);
};

export const MenuListItem = memo(MenuListItemComponent);
