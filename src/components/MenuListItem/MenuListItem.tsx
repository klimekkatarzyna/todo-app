import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { Share } from '@styled-icons/feather/Share';
import { List } from '@styled-icons/feather/List';
import styled from 'styled-components';
import { COLOURS, contextualMenuSecountOpion, IconWrapper } from "../../constants";
import { IListItem } from "../../interfaces";
import ContextualMenu from "../ContextualMenu/ContextualMenu";
import { ContextMenuTrigger } from 'react-contextmenu';

import { Sun } from '@styled-icons/feather/Sun';
import { Star } from '@styled-icons/feather/Star';
import { Calendar } from '@styled-icons/feather/Calendar';
import { User } from '@styled-icons/feather/User';
import { Home } from '@styled-icons/feather/Home';

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

const TasksNumber = styled.div`
    margin-left: auto;
    color: ${COLOURS.fontColor};
`;

const Name = styled.div`
    color: ${COLOURS.fontColor};
    margin-left: 0.5rem;
    overflow-wrap: anywhere;
`;

interface IMenuListItem  {
    listItem: IListItem;
    isShared?: boolean;
}

export const MenuListItem: FC<IMenuListItem > = ({ isShared = false, listItem }) => {
    const icon = useMemo(() => listItem.url === '/' && <Sun /> ||
        listItem.url === '/important' && <Star /> ||
        listItem.url === '/planned' && <Calendar /> ||
        listItem.url === '/assigned_to_me' && <User /> ||
        listItem.url === '/inbox' && <Home />, [listItem]);

    return (
        <LinkStyled to={listItem?.isMainList ? `${listItem?.url}` : `/tasks/${listItem?._id}`}>
            <ContextMenuTrigger id={listItem?._id || ''}>
                <IconWrapper color={listItem?.themeColor || COLOURS.blue}>{icon || <List />}</IconWrapper>
                <Name>{listItem?.title}</Name>
                {isShared && <Share />}
                {!!listItem?.taskNumber && <TasksNumber>{listItem?.taskNumber}</TasksNumber>}
            </ContextMenuTrigger>
            <ContextualMenu contextualMenuList={contextualMenuSecountOpion} listElementId={listItem?._id || ''} />
        </LinkStyled>
    )
}