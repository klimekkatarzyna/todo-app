import React, { FC } from 'react';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from '../../constants';
import { IContextualMenuList } from '../../interfaces';
import { MenuItem } from 'react-contextmenu';

const Item = styled(MenuItem)`
    display: inline-flex;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    &:hover {
        background-color: ${COLOURS.lightGrey};
    }
    > span {
        margin-left: 1rem;
    }
    &:last-child {
        border-top: 1px solid  ${COLOURS.lightGrey};
        color: ${COLOURS.red};
    }
`;

interface IContextualMenuItem {
    listItem: IContextualMenuList;
    listElementId: string;
}

interface IItem extends IContextualMenuList {
    listElementId: string;
};

const ContextualMenuItem: FC<IContextualMenuItem> = ({ listItem, listElementId }) => {
    const handleClick = (e: any, data: IItem ) => {
        console.log(data.listElementId, data.name);
    }

    return (
        <Item data={{ ...listItem, listElementId}} onClick={handleClick}>
            <IconWrapper color={COLOURS.fontColor}>{listItem.icon}</IconWrapper>
            <span>{listItem.name}</span>
        </Item>
    );
};

export default ContextualMenuItem;