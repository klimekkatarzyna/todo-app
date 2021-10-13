import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Share } from '@styled-icons/feather/Share';
import { List } from '@styled-icons/feather/List';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from "../../constants";
import { IListItem } from "../../interfaces";

const LinkStyled = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        background-color: ${COLOURS.white};
    }

    > svg {
        margin-right: 0.5rem;
    }
`;

const TasksNumber = styled.div`
    margin-left: auto;
    color: ${COLOURS.lightGrey};
`;

const Name = styled.div`
    color: ${COLOURS.fontColor};
    margin-left: 0.5rem;
`;

interface IMenuListItem  {
    listItem: IListItem;
    isShared?: boolean;
}

export const MenuListItem: FC<IMenuListItem > = ({ isShared = false, listItem }) => {
    // TODO: handle themes 
    return (
        <LinkStyled to={listItem?.url || ''}>
            <IconWrapper color={listItem?.themeColor || COLOURS.blue}>{listItem.icon || <List />}</IconWrapper>
            <Name>{listItem?.title}</Name>
            {isShared && <Share />}
            {listItem?.tasksNumber && <TasksNumber>{listItem?.tasksNumber}</TasksNumber>}
        </LinkStyled>
    )
}