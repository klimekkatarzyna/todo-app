import React, { FC } from "react";
import { Share } from '@styled-icons/feather/Share';
import { List } from '@styled-icons/feather/List';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from "../../constants";

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

interface IMenuListIte  {
    name: string;
    isShared?: boolean;
    tasksNumber?: number;
    icon?: React.ReactNode;
    colorType?: string | undefined;
}

export const MenuListItem: FC<IMenuListIte > = ({ icon, name, isShared = false, tasksNumber, colorType  }) => {
    // TODO: handle themes 
    return (
        <Wrapper>
            <IconWrapper color={colorType || COLOURS.blue}>{icon || <List />}</IconWrapper>
            <Name>{name}</Name>
            {isShared && <Share />}
            {tasksNumber && <TasksNumber>{tasksNumber}</TasksNumber>}
        </Wrapper>
    )
}