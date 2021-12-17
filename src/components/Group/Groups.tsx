import React, { FC } from 'react';
import { ContextualMenuOpion } from '../../enums';
import { IGroup } from '../../interfaces/group';
import { Modal } from '../Modal/Modal';
import { Group } from './Group';
import { useGroup } from './useGroup';

interface IGroupsProps {
	isNavClosed: boolean;
}

export const Groups: FC<IGroupsProps> = ({ isNavClosed }) => {
	const { groupsData, deleteGroupMutate } = useGroup();

	return (
		<div>
			{groupsData?.body?.groups?.map((group: IGroup) => (
				<Group key={group?._id} group={group} isNavClosed={isNavClosed} />
			))}
			<Modal title='Czy chcesz usunąć grupę?' onHandleAction={deleteGroupMutate} contextualType={ContextualMenuOpion.remove_group} />
		</div>
	);
};
