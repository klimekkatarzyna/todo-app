import { FC, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOURS, contextualMenuSecountOpion, contextualMenuSecountOpionMembers, IconWrapper } from '../../constants';
import { IList, ITask } from '@kkrawczyk/todo-common';
import { SideMenuType } from '../../enums';
import { ContextMenuTrigger } from 'react-contextmenu';
import { ContextualMenu } from '../ContextualMenu/ContextualMenu';
import { useSharingData } from '../../hooks/useSharingData';
import { useQuery } from 'react-query';
import { getTasksOfCurrentListAction } from '../../actions/tasks';
import { Sun, Star, List, Calendar, User, Users, Home } from 'react-feather';

const LinkStyled = styled(Link)`
	text-decoration: none;
	> div {
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		cursor: pointer;
		position: relative;
		&:hover {
			background-color: ${COLOURS.white};
		}

		> svg {
			margin-left: 0.5rem;
			width: 18px;
			stroke: ${COLOURS.fontColor};
		}
	}
`;

const TasksNumber = styled.div<{ isNavClosed: boolean | undefined }>`
	margin-left: auto;
	color: ${COLOURS.fontColor};
	display: ${props => (props.isNavClosed ? 'none' : 'flex')};
`;

const Name = styled.div<{ isNavClosed: boolean | undefined }>`
	color: ${COLOURS.fontColor};
	margin-left: 0.5rem;
	overflow-wrap: anywhere;
	display: ${props => (props.isNavClosed ? 'none' : 'flex')};
`;

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
	const { data } = useQuery<ITask[] | undefined>(['tasksOfCurrentList', listItem._id], () =>
		getTasksOfCurrentListAction({ parentFolderId: listItem._id })
	);

	return (
		<LinkStyled to={listItem?.isMainList ? `${listItem?.url}` : `/tasks/${listItem?._id}`}>
			<ContextMenuTrigger id={listItem?._id || ''}>
				<IconWrapper color={listItem?.themeColor || COLOURS.blue}>{icon || <List strokeWidth={1} />}</IconWrapper>
				<Name isNavClosed={isNavClosed} className='text-sm'>
					{listItem?.title}
				</Name>
				{!!listItem.members?.length && <Users strokeWidth={1} className='text-sm' />}
				{!!data?.length && (
					<TasksNumber className='text-sm' isNavClosed={isNavClosed}>
						{data?.length}
					</TasksNumber>
				)}
			</ContextMenuTrigger>
			<ContextualMenu
				contextualMenuList={isOwner ? contextualMenuSecountOpion : contextualMenuSecountOpionMembers}
				elementId={listItem?._id || ''}
			/>
		</LinkStyled>
	);
};

export const MenuListItem = memo(MenuListItemComponent);
