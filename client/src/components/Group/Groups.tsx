import React, { FC, useContext } from 'react';
import { ContextualMenuOpion } from '../../enums';
import { IGroup } from '@kkrawczyk/common/src/types';
import { Modal } from '../Modal/Modal';
import { Group } from './Group';
import { useGroup } from '../../hooks/useGroup';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';

interface IGroupsProps {
	isNavClosed: boolean;
}

export const Groups: FC<IGroupsProps> = ({ isNavClosed }) => {
	const { groupsData, deleteGroupMutate } = useGroup();
	const { isVisible } = useContext(ModalVisibilityContext);

	return (
		<div>
			{groupsData?.body?.groups?.map((group: IGroup) => (
				<Group key={group?._id} group={group} isNavClosed={isNavClosed} />
			))}
			{isVisible && (
				<Modal title='Czy chcesz usunąć grupę?' onHandleAction={deleteGroupMutate} contextualType={ContextualMenuOpion.remove_group} />
			)}
		</div>
	);
};
