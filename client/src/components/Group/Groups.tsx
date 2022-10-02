import { FC, useCallback, useContext } from 'react';
import { ContextMenuOpion, QueryKey } from '../../enums';
import { IGroup } from '@kkrawczyk/todo-common';
import { Group } from './Group';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteGroup, getGroups } from '../../api/groups';
import { Loader } from 'react-feather';
import { ContextMenuContext } from '../../providers/ContextMenuProvider';
import toast from 'react-hot-toast';
import { ConfirmModal } from '../Modal/ConfirmModal';
import { useModal } from '../../hooks/useModal';
import { useTranslation } from 'react-i18next';

export const Groups: FC<{ isNavClosed: boolean }> = ({ isNavClosed }) => {
	const { t } = useTranslation();
	const query = useQueryClient();
	const { contextualMenu } = useContext(ContextMenuContext);
	const { modalType } = useModal();

	const { isLoading: getGroupsLoading, data } = useQuery<IGroup[] | undefined>(QueryKey.groups, getGroups);

	const { mutateAsync, isLoading } = useMutation(deleteGroup, {
		onSuccess: async response => {
			query.setQueryData<IGroup[] | undefined>([QueryKey.groups], (groups: IGroup[] | undefined) =>
				groups?.filter(group => group._id !== response.data?._id)
			);
			toast.success(t('remove-group-success'));
		},
	});

	const onRemoveGroup = useCallback(async () => {
		if (contextualMenu?.type !== ContextMenuOpion.remove_group) return;
		await mutateAsync({ _id: contextualMenu?.elementId });
	}, [contextualMenu, mutateAsync]);

	return (
		<div>
			{getGroupsLoading && <Loader />}
			{data?.map((group, index) => (
				<Group key={index} group={group} isNavClosed={isNavClosed} />
			))}
			{modalType === ContextMenuOpion.remove_group && (
				<ConfirmModal title={t('remove-group-modal-title')} onHandleAction={onRemoveGroup} isLoading={isLoading} />
			)}
		</div>
	);
};
