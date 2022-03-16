import { FC, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOURS, contextualMenuSecountOpion, contextualMenuSecountOpionMembers, IconWrapper } from '../../constants';
import { IList } from '@kkrawczyk/common/types';
import { Sun } from '@styled-icons/feather/Sun';
import { Star } from '@styled-icons/feather/Star';
import { List } from '@styled-icons/feather/List';
import { Calendar } from '@styled-icons/feather/Calendar';
import { User } from '@styled-icons/feather/User';
import { Users } from '@styled-icons/feather/Users';
import { Home } from '@styled-icons/feather/Home';
import { SideMenuType } from '../../enums';
import { ContextMenuTrigger } from 'react-contextmenu';
import { ContextualMenu } from '../ContextualMenu/ContextualMenu';
import { useSharingData } from '../../hooks/useSharingData';

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
			(listItem.url === SideMenuType.myDay && <Sun />) ||
			(listItem.url === SideMenuType.important && <Star />) ||
			(listItem.url === SideMenuType.planned && <Calendar />) ||
			(listItem.url === SideMenuType.assigned && <User />) ||
			(listItem.url === SideMenuType.inbox && <Home />),
		[listItem]
	);
	const { isUserListOwner } = useSharingData(listItem?.members);

	return (
		<LinkStyled to={listItem?.isMainList ? `${listItem?.url}` : `/tasks/${listItem?._id}`}>
			<ContextMenuTrigger id={listItem?._id || ''}>
				<IconWrapper color={listItem?.themeColor || COLOURS.blue}>{icon || <List />}</IconWrapper>
				<Name isNavClosed={isNavClosed}>{listItem?.title}</Name>
				{!!listItem.members?.length && <Users />}
				{!!listItem?.taskNumber && <TasksNumber isNavClosed={isNavClosed}>{listItem?.taskNumber}</TasksNumber>}
			</ContextMenuTrigger>
			<ContextualMenu
				contextualMenuList={isUserListOwner ? contextualMenuSecountOpionMembers : contextualMenuSecountOpion}
				elementId={listItem?._id || ''}
			/>
		</LinkStyled>
	);
};

export const MenuListItem = memo(MenuListItemComponent);
