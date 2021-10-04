import React, { FC } from 'react';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from '../../constants';
import { IContextualMenuList } from '../../interfaces';

const ContextualMenuWrapper = styled.div`
    background-color: ${COLOURS.white};
    display: flex;
    flex-direction: column;
    color: ${COLOURS.fontColor};
    box-shadow: 1px 1px 12px 0px #cacaca;
    max-width: 280px;
`;

const Item = styled.div`
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

interface IContextualMenu {
    contextualMenuList: IContextualMenuList[];
}

const ContextualMenu: FC<IContextualMenu> = ({ contextualMenuList }) => {
    return (
        <ContextualMenuWrapper>
            {contextualMenuList.map((listItem) => 
                <Item> {/* TODO: Item sa new component ! */}
                    <IconWrapper color={COLOURS.fontColor}>{listItem.icon}</IconWrapper>
                    <span>{listItem.name}</span>
                </Item>
            )}
        </ContextualMenuWrapper>
    );
};

export default ContextualMenu;