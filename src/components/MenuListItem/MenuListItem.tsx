import React, { FC } from "react";
import { Share } from '@styled-icons/feather/Share';
import { List } from '@styled-icons/feather/List';
import styled from 'styled-components';
import { COLOURS } from "../../constants";

const Wrapper = styled.div<{ color: string | undefined }>`
    display: flex;
    align-items: center;
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
    cursor: pointer;
    > svg {
        width: 1.2rem;
        height: 1.2rem;
        color: ${props => props.color || `${COLOURS.blue}`};
        margin-right: 0.5rem;
    }
`;

const TasksNumber = styled.div`
    margin-left: auto;
    color: ${COLOURS.lightGrey};
`;

const Name = styled.div`
    color: ${COLOURS.white};
`;

interface IMenuListIte  {
    name: string;
    isShared?: boolean;
    tasksNumber?: number;
    icon?: unknown;
    colorType?: string | undefined;
}

export const MenuListItem: FC<IMenuListIte > = ({ icon, name, isShared = false, tasksNumber, colorType  }) => {
    // TODO: handle themes 
    return (
        <Wrapper color={colorType}>
            {icon || <List />}
            <Name>{name}</Name>
            {isShared && <Share />}
            {tasksNumber && <TasksNumber>{tasksNumber}</TasksNumber>}
        </Wrapper>
    )
}