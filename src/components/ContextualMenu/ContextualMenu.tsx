import React, { FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { IContextualMenuList } from '../../interfaces';
import ContextualMenuItem from './ContextualMenuItem';
import { ContextMenu } from 'react-contextmenu';

const ContextualMenuWrapper = styled(ContextMenu)`
    background-color: ${COLOURS.white};
    display: flex;
    flex-direction: column;
    color: ${COLOURS.fontColor};
    box-shadow: 1px 1px 12px 0px #cacaca;
    max-width: 280px;
    position: absolute;
    top: 20px;
    right: -50px;
    z-index: 1;
`;

interface IContextualMenu {
    contextualMenuList: IContextualMenuList[];
    listElementId: string;
}

const ContextualMenu: FC<IContextualMenu> = ({ contextualMenuList, listElementId }) => {
    return (
        <ContextualMenuWrapper id={listElementId}>
            {contextualMenuList.map((listItem) => 
                <ContextualMenuItem listItem={listItem} listElementId={listElementId} />
            )}
        </ContextualMenuWrapper>
    );
};

export default ContextualMenu;