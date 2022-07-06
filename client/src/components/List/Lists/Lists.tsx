import { FC, memo, useCallback, useContext } from 'react';
import { MenuListItem } from '../../MenuListItem/MenuListItem';
import { Loader } from 'react-feather';
import { ContextualModal } from '../../Modal/ContextualModal';
import { ContextMenuOpion, QueryKey } from '../../../enums';
import { SharingOptions } from '../../SharingOptions/SharingOptions';
import { useMutation, useQueryClient } from 'react-query';
import { IList } from '@kkrawczyk/todo-common';
import { useList } from '../../../hooks/useList';
import { useRecoilValue } from 'recoil';
import { listsState } from '../../../atoms';
import { updateMembersList } from '../../../actions/sharing';
import { ContextMenuContext } from '../../../ContextMenuProvider';
import { AuthContext } from '../../../AuthProvider';
import toast from 'react-hot-toast';
import { modalVisibilityState } from '../../../atoms/modal';
import { useSwitchToFirstListItem } from '../../../hooks/useSwitchToFirstListItem';

const ListsComponents: FC<{ isNavClosed: boolean }> = ({ isNavClosed }) => {
	const query = useQueryClient();
	const { onHandleSwitchToFirstListItem } = useSwitchToFirstListItem();
	const isVisible = useRecoilValue(modalVisibilityState);
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
			<div className='flex flex-col text-base'>
				{getListsLoading && <Loader className='m-auto' />}
				{list?.map((list: IList, index: number) => (
					<MenuListItem key={index} listItem={list} isNavClosed={isNavClosed} />
				))}
			</div>
			{isVisible && (
				<ContextualModal title='Czy chcesz usunąć listę?' onHandleAction={removeList} contextualType={ContextMenuOpion.remove_list} />
			)}
			{isVisible && (
				<ContextualModal title='' onHandleAction={() => {}} contextualType={ContextMenuOpion.sharing_options} isActionButtonHidden>
					<SharingOptions />
				</ContextualModal>
			)}
			{isVisible && (
				<ContextualModal
					title='Czy chcesz opuścić tę listę?'
					onHandleAction={() => mutate({ _id: contextualMenu?.elementId, member: authData?._id })}
					contextualType={ContextMenuOpion.leave_list}
				/>
			)}
		</>
	);
};

export const Lists = memo(ListsComponents);
