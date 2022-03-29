import React, { FC, useContext } from 'react';
import { ContextualMenuOpion } from '../../enums';
import { IGroup } from '@kkrawczyk/todo-common';
import { Modal } from '../Modal/Modal';
import { Group } from './Group';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteGroup, getGroups } from '../../actions/groups';
import { HttpResponse } from '../../utils/http';
import { IGroupsResponse } from '../../interfaces/group';

interface IGroupsProps {
	isNavClosed: boolean;
}

export const Groups: FC<IGroupsProps> = ({ isNavClosed }) => {
	const query = useQueryClient();
	const { isVisible } = useContext(ModalVisibilityContext);

	const { isLoading: getGroupsLoading, data } = useQuery<HttpResponse<IGroupsResponse> | undefined>('groups', getGroups, {
		useErrorBoundary: true,
	});

	const { mutate, error, isLoading } = useMutation(deleteGroup, {
		onSuccess: () => {
			query.invalidateQueries(['groups']);
		},
	});

	return (
		<div>
			{data?.body?.groups?.map((group: IGroup) => (
				<Group key={group?._id} group={group} isNavClosed={isNavClosed} />
			))}
			{isVisible && <Modal title='Czy chcesz usunąć grupę?' onHandleAction={mutate} contextualType={ContextualMenuOpion.remove_group} />}
		</div>
	);
};
