import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Share } from '@styled-icons/feather/Share';
import { List } from '@styled-icons/feather/List';
import styled from 'styled-components';
import { COLOURS, contextualMenuSecountOpion, IconWrapper } from "../../constants";
import { IListItem, IListItemType } from "../../interfaces";
import ContextualMenu from "../ContextualMenu/ContextualMenu";
import { ContextMenuTrigger } from 'react-contextmenu';

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
    color: ${COLOURS.lightGrey};
`;

const Name = styled.div`
    color: ${COLOURS.fontColor};
    margin-left: 0.5rem;
    overflow-wrap: anywhere;
`;

interface IMenuListItem  {
    listItem: IListItem;
    isShared?: boolean;
    type?: IListItemType;
}

export const MenuListItem: FC<IMenuListItem > = ({ isShared = false, listItem, type }) => {
    // TODO: handle themes
    return (
        <LinkStyled to={type === IListItemType.TASK ? `/tasks/${listItem?._id}` : `${listItem?._id}`}>
            <ContextMenuTrigger id={listItem?._id || ''}>
                <IconWrapper color={listItem?.themeColor || COLOURS.blue}>{listItem.icon || <List />}</IconWrapper>
                <Name>{listItem?.title}</Name>
                {isShared && <Share />}
                {listItem?.tasksNumber && <TasksNumber>{listItem?.tasksNumber}</TasksNumber>}
            </ContextMenuTrigger>
            <ContextualMenu contextualMenuList={contextualMenuSecountOpion} listElementId={listItem?._id || ''} />
        </LinkStyled>
    )
}