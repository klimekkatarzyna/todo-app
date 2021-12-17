import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOURS, contextualMenuSecountOpion, IconWrapper } from '../../constants';
import { IDeleteListResponse, IListItem } from '../../interfaces/list';
import { Sun } from '@styled-icons/feather/Sun';
import { Star } from '@styled-icons/feather/Star';
import { Share } from '@styled-icons/feather/Share';
import { List } from '@styled-icons/feather/List';
import { Calendar } from '@styled-icons/feather/Calendar';
import { User } from '@styled-icons/feather/User';
import { Home } from '@styled-icons/feather/Home';
import { SideMenuType } from '../../enums';
import { UseMutateFunction } from 'react-query';
import { HttpResponse } from '../../utils/http';
import { ContextMenuTrigger } from 'react-contextmenu';
import { ContextualMenu } from '../ContextualMenu/ContextualMenu';

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
			margin-right: 0.5rem;
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
	listItem: IListItem;
	isShared?: boolean;
	isNavClosed?: boolean | undefined;
}

export const MenuListItem: FC<IMenuListItem> = ({ isShared = false, listItem, isNavClosed }) => {
	const icon = useMemo(
		() =>
			(listItem.url === SideMenuType.myDay && <Sun />) ||
			(listItem.url === SideMenuType.important && <Star />) ||
			(listItem.url === SideMenuType.planned && <Calendar />) ||
			(listItem.url === SideMenuType.assigned && <User />) ||
			(listItem.url === SideMenuType.inbox && <Home />),
		[listItem]
	);

	return (
		<LinkStyled to={listItem?.isMainList ? `${listItem?.url}` : `/tasks/${listItem?._id}`}>
			<ContextMenuTrigger id={listItem?._id || ''}>
				<IconWrapper color={listItem?.themeColor || COLOURS.blue}>{icon || <List />}</IconWrapper>
				<Name isNavClosed={isNavClosed}>{listItem?.title}</Name>
				{isShared && <Share />}
				{!!listItem?.taskNumber && <TasksNumber isNavClosed={isNavClosed}>{listItem?.taskNumber}</TasksNumber>}
			</ContextMenuTrigger>
			<ContextualMenu contextualMenuList={contextualMenuSecountOpion} elementId={listItem?._id || ''} />
		</LinkStyled>
	);
};
