import { FC, useCallback, useContext } from 'react';
import { ContextualMenuOpion } from '../../enums';
import { IGroup } from '@kkrawczyk/todo-common';
import { Modal } from '../Modal/Modal';
import { Group } from './Group';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteGroup, getGroups } from '../../actions/groups';
import { Loader } from 'react-feather';
import { ContextualMenuContext } from '../../ContextualMenuProvider';

interface IGroupsProps {
	isNavClosed: boolean;
}

export const Groups: FC<IGroupsProps> = ({ isNavClosed }) => {
	const query = useQueryClient();
	const { isVisible } = useContext(ModalVisibilityContext);
	const { contextualMenu } = useContext(ContextualMenuContext);

	const { isLoading: getGroupsLoading, data } = useQuery<IGroup[] | undefined>('groups', getGroups, {
		useErrorBoundary: true,
	});

	const { mutate, error, isLoading } = useMutation(deleteGroup, {
		onSuccess: () => {
			query.invalidateQueries(['groups']);
		},
	});

	const onRemoveGroup = useCallback(() => {
		mutate({ _id: contextualMenu?.elementId });
	}, [contextualMenu]);

	return (
		<div>
			{getGroupsLoading && <Loader />}
			{data?.map(group => (
				<Group key={group?._id} group={group} isNavClosed={isNavClosed} />
			))}
			{isVisible && (
				<Modal
					title='Czy chcesz usunąć grupę?'
					onHandleAction={onRemoveGroup}
					contextualType={ContextualMenuOpion.remove_group}
					isLoading={isLoading}
				/>
			)}
		</div>
	);
};
