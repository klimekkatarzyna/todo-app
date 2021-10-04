import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Share } from '@styled-icons/feather/Share';
import { List } from '@styled-icons/feather/List';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from "../../constants";
import { IListItem } from "../../interfaces";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.3rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
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
`;

interface IMenuListItem  {
    listItem: IListItem;
    isShared?: boolean;
}

export const MenuListItem: FC<IMenuListItem > = ({ isShared = false, listItem }) => {
    // TODO: handle themes 
    return (
        <Wrapper>
            <IconWrapper color={listItem?.color || COLOURS.blue}>{listItem.icon || <List />}</IconWrapper>
            <Name>
                <Link to={listItem?.url || ''}>{listItem?.name}</Link>
            </Name>
            {isShared && <Share />}
            {listItem?.tasksNumber && <TasksNumber>{listItem?.tasksNumber}</TasksNumber>}
        </Wrapper>
    )
}