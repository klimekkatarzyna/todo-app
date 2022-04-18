import { FC, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { COLOURS, contextualMenuSecountOpion, contextualMenuSecountOpionMembers, IconWrapper } from '../../constants';
import { IList, ITask } from '@kkrawczyk/todo-common';
import { QueryKey, SideMenuType } from '../../enums';
import { ContextMenuTrigger } from 'react-contextmenu';
import { ContextualMenu } from '../ContextualMenu/ContextualMenu';
import { useSharingData } from '../../hooks/useSharingData';
import { useQuery } from 'react-query';
import { getTasksOfCurrentListAction } from '../../actions/tasks';
import { Sun, Star, List, Calendar, User, Users, Home } from 'react-feather';

interface IMenuListItem {
	listItem: IList;
	isNavClosed?: boolean | undefined;
}

const MenuListItemComponent: FC<IMenuListItem> = ({ listItem, isNavClosed }) => {
	const icon = useMemo(
		() =>
			(listItem.url === SideMenuType.myDay && <Sun strokeWidth={1} />) ||
			(listItem.url === SideMenuType.important && <Star strokeWidth={1} />) ||
			(listItem.url === SideMenuType.planned && <Calendar strokeWidth={1} />) ||
			(listItem.url === SideMenuType.assigned && <User strokeWidth={1} />) ||
			(listItem.url === SideMenuType.inbox && <Home strokeWidth={1} />),
		[listItem]
	);
	const { isOwner } = useSharingData(listItem?.userId);
	const { data } = useQuery<ITask[] | undefined>([QueryKey.tasksOfCurrentList, listItem._id], () =>
		getTasksOfCurrentListAction({ parentFolderId: listItem._id })
	);

	return (
		<Link to={listItem?.isMainList ? `${listItem?.url}` : `/tasks/${listItem?._id}`} className='no-underline'>
			<ContextMenuTrigger id={listItem?._id || ''}>
				<div className={'flex align-center px-4 py-2 text-sm hover:bg-white'}>
					<IconWrapper color={listItem?.themeColor || COLOURS.blue}>{icon || <List strokeWidth={1} className='mr-2' />}</IconWrapper>
					<div className={`text-sm text-fontColor ml-2 break-words ${isNavClosed ? 'hidden' : 'flex'}`}>{listItem?.title}</div>
					{!!listItem.members?.length && <Users strokeWidth={1} className='text-sm ml-2 w-4 stroke-fontColor' />}
					{!!data?.length && <div className={`text-sm text-fontColor ml-auto ${isNavClosed ? 'hidden' : 'flex'}`}>{data?.length}</div>}
				</div>
			</ContextMenuTrigger>
			<ContextualMenu
				contextualMenuList={isOwner ? contextualMenuSecountOpion : contextualMenuSecountOpionMembers}
				elementId={listItem?._id || ''}
			/>
		</Link>
	);
};

export const MenuListItem = memo(MenuListItemComponent);
