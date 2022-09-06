import { FC, memo, useCallback, useContext } from 'react';
import { MenuListItem } from '../../MenuListItem/MenuListItem';
import { Loader } from 'react-feather';
import { ContextMenuOpion, QueryKey } from '../../../enums';
import { SharingOptions } from '../../SharingOptions/SharingOptions';
import { useMutation, useQueryClient } from 'react-query';
import { IList } from '@kkrawczyk/todo-common';
import { useList } from '../../../hooks/useList';
import { useRecoilValue } from 'recoil';
import { listsState } from '../../../atoms';
import { updateMembersList } from '../../../actions/sharing';
import { ContextMenuContext } from '../../../providers/ContextMenuProvider';
import { AuthContext } from '../../../AuthProvider';
import toast from 'react-hot-toast';
import { useSwitchToFirstListItem } from '../../../hooks/useSwitchToFirstListItem';
import { ConfirmModal } from '../../Modal/ConfirmModal';
import { useModal } from '../../../hooks/useModal';
import { RegularModal } from '../../Modal/RegularModal';

const ListsComponents: FC<{ isNavClosed: boolean }> = ({ isNavClosed }) => {
	const query = useQueryClient();
	const { onHandleSwitchToFirstListItem } = useSwitchToFirstListItem();
	const { modalType } = useModal();
	const { getListsLoading, removeListMutation } = useList();
	const list = useRecoilValue(listsState);
	const { contextualMenu } = useContext(ContextMenuContext);
	const { authData } = useContext(AuthContext);

	const removeList = useCallback(async () => {
		if (contextualMenu?.type !== ContextMenuOpion.remove_list) return;
		await removeListMutation({ _id: contextualMenu?.elementId });
		onHandleSwitchToFirstListItem();
	}, [contextualMenu, onHandleSwitchToFirstListItem]);

	const { mutate, isLoading, isError } = useMutation(updateMembersList, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.getListById]);
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Opuściłeś listę');
		},
	});

	return (
		<>
			<div className='flex flex-col text-base' id='list-items'>
				{getListsLoading && <Loader className='animate-spin m-auto' />}
				{list?.map((list: IList, index: number) => (
					<MenuListItem key={index} listItem={list} isNavClosed={isNavClosed} />
				))}
			</div>

			{modalType === ContextMenuOpion.remove_list && <ConfirmModal title='Czy chcesz usunąć listę?' onHandleAction={removeList} />}
			{modalType === ContextMenuOpion.sharing_options && (
				<RegularModal title='Udostępnij listę'>
					<SharingOptions />
				</RegularModal>
			)}
			{modalType === ContextMenuOpion.leave_list && (
				<ConfirmModal
					title='Czy chcesz opuścić tę listę?'
					onHandleAction={() => mutate({ _id: contextualMenu?.elementId, member: authData?._id })}
				/>
			)}
		</>
	);
};

export const Lists = memo(ListsComponents);
