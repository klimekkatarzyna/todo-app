import React, { FC } from 'react';
import { IGroup } from '../../interfaces/group';
import { Group } from './Group';
import { useGroup } from './useGroup';

interface IGroupsProps {
	isNavClosed: boolean;
}

export const Groups: FC<IGroupsProps> = ({ isNavClosed }) => {
	const { groupsData } = useGroup();

	return (
		<div>
			{groupsData?.body?.groups?.map((group: IGroup) => (
				<Group group={group} isNavClosed={isNavClosed} />
			))}
		</div>
	);
};
