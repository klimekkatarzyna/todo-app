import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from '../../constants';
import { IContextualMenuList } from '../../interfaces';
import { MenuItem } from 'react-contextmenu';
import useList from '../List/useList';
import { useMutation, useQueryClient } from 'react-query';
import Modal from '../Modal/Modal';

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
    const query = useQueryClient();
    const { deleteList } = useList();

    const { mutate: mutateRemoveList } = useMutation(deleteList, {
        onSuccess: () => {
            query.invalidateQueries(['lists'])
        }
    });

    const handleClick = useCallback(async (e: any, data: IItem ) => {
        try {
            console.log(data.listElementId, data.name);
            await mutateRemoveList(data.listElementId);
        } catch {
            //TODO: handle error & show notificayion
        }
    }, []);

    return (
        <Item data={{ ...listItem, listElementId}} onClick={handleClick}>
            <IconWrapper color={COLOURS.fontColor}>{listItem.icon}</IconWrapper>
            <span>{listItem.name}</span>
            <Modal title={'Lista zostanie trwale usunieta.'} subtitle={'Tej akcji nie można cofnąć'} />
        </Item>
    );
};

export default ContextualMenuItem;