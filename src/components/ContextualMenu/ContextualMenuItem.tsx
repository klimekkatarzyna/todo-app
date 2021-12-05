import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from '../../constants';
import { IContextualMenuList } from '../../interfaces/list';
import { MenuItem } from 'react-contextmenu';
import useList from '../List/useList';
import { useQueryClient } from 'react-query';
import { Modal } from '../Modal/Modal';
import { useShowModal } from '../../hooks/useShowModal';
import { ContextualMenuOpion } from '../../enums';
import { useTask } from '../Tasks/useTask';

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
		border-top: 1px solid ${COLOURS.lightGrey};
		color: ${COLOURS.red};
	}
`;

interface IContextualMenuItem {
	listItem: IContextualMenuList;
	listElementId: string;
}

interface IItem extends IContextualMenuList {
	listElementId: string;
}

export const ContextualMenuItem: FC<IContextualMenuItem> = ({ listItem, listElementId }) => {
	const query = useQueryClient();
	const { mutateRemoveList } = useList();
	const { mutateRemoveTask } = useTask();
	const [selectedMenuItemType, setSelectedMenuItemType] = useState<boolean>(false);
	const { isModalVisible, onOpeneModal } = useShowModal();

	const handleClick = useCallback(async (event: React.ChangeEvent<HTMLInputElement>, data: IItem): Promise<void> => {
		try {
			// console.log(data.type === ContextualMenuOpion.remove_list, data.listElementId, data.name);
			if (data.type === ContextualMenuOpion.remove_list) {
				onOpeneModal();
				//setSelectedMenuItemType(true);
				await mutateRemoveList(data.listElementId);

				// TODO: handle switch to last item of list of lists and display content
			}
			data.type === ContextualMenuOpion.remove_task && (await mutateRemoveTask(data.listElementId));
		} catch {
			//TODO: handle error & show notificayion
		}
	}, []);

	// useEffect(() => {
	//     onOpeneModal();
	// }, [selectedMenuItemType])

	return (
		<Item data={{ ...listItem, listElementId }} onClick={handleClick}>
			<IconWrapper color={COLOURS.fontColor}>{listItem.icon}</IconWrapper>
			<span>{listItem.name}</span>
			{/* {isModalVisible &&
                <Modal title={'Lista zostanie trwale usunieta.'} subtitle={'Tej akcji nie można cofnąć'} />
            } */}
		</Item>
	);
};
