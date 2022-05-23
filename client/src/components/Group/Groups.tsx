import { FC, useCallback, useContext } from 'react';
import { ContextMenuOpion, QueryKey } from '../../enums';
import { IGroup } from '@kkrawczyk/todo-common';
import { ContextualModal } from '../Modal/ContextualModal';
import { Group } from './Group';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteGroup, getGroups } from '../../actions/groups';
import { Loader } from 'react-feather';
import { ContextMenuContext } from '../../ContextMenuProvider';
import toast from 'react-hot-toast';
import { useRecoilValue } from 'recoil';
import { modalVisibilityState } from '../../atoms/modal';

interface IGroupsProps {
	isNavClosed: boolean;
}

export const Groups: FC<IGroupsProps> = ({ isNavClosed }) => {
	const query = useQueryClient();
	const isVisible = useRecoilValue(modalVisibilityState);
	const { contextualMenu } = useContext(ContextMenuContext);

	const { isLoading: getGroupsLoading, data } = useQuery<IGroup[] | undefined>(QueryKey.groups, getGroups, {
		useErrorBoundary: true,
	});

	const { mutate, error, isLoading } = useMutation(deleteGroup, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.groups]);
			toast.success('Grupa usunięta');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	const onRemoveGroup = useCallback(() => {
		if (contextualMenu?.type !== ContextMenuOpion.remove_group) return;
		mutate({ _id: contextualMenu?.elementId });
	}, [contextualMenu]);

	return (
		<div>
			{getGroupsLoading && <Loader />}
			{data?.map(group => (
				<Group key={group?._id} group={group} isNavClosed={isNavClosed} />
			))}
			{isVisible && (
				<ContextualModal
					title='Czy chcesz usunąć grupę?'
					onHandleAction={onRemoveGroup}
					contextualType={ContextMenuOpion.remove_group}
					isLoading={isLoading}
				/>
			)}
		</div>
	);
};
