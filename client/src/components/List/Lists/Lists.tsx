import { FC, memo, useCallback, useContext } from 'react';
import { MenuListItem } from '../../MenuListItem/MenuListItem';
import { Loader } from 'react-feather';
import { ContextualModal } from '../../Modal/ContextualModal';
import { ContextMenuOpion, QueryKey, ROUTE } from '../../../enums';
import { SharingOptions } from '../../SharingOptions/SharingOptions';
import { useMutation, useQueryClient } from 'react-query';
import { addInvitationTokenToListAction } from '../../../actions/lists';
import { ModalVisibilityContext } from '../../../ModalVisibilityProvider';
import { IList } from '@kkrawczyk/todo-common';
import { useList } from '../../../hooks/useList';
import { useRecoilValue } from 'recoil';
import { listsState } from '../../../atoms';
import { updateMembersList } from '../../../actions/sharing';
import { ContextMenuContext } from '../../../ContextMenuProvider';
import { AuthContext } from '../../../AuthProvider';
import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { buildUrl } from '../../../utils/paths';

interface ILists {
	isNavClosed: boolean;
}

const ListsComponents: FC<ILists> = ({ isNavClosed }) => {
	const query = useQueryClient();
	const history = useHistory();
	const { isVisible } = useContext(ModalVisibilityContext);
	const { getListsLoading, removeListMutation } = useList();
	const list = useRecoilValue(listsState);
	const { contextualMenu } = useContext(ContextMenuContext);
	const { authData } = useContext(AuthContext);

	const { mutate: addInvitationTokenToListMutation, isLoading: addInvitationTokenToListLoading } = useMutation(addInvitationTokenToListAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.getListById]);
		},
	});

	const removeList = useCallback(() => {
		if (contextualMenu?.type !== ContextMenuOpion.remove_list) return;
		removeListMutation({ _id: contextualMenu?.elementId });
		history.push(buildUrl(ROUTE.listsDetails, { listId: list?.[0]?._id || '' }));
	}, [contextualMenu]);

	const { mutate, isLoading, isError } = useMutation(updateMembersList, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.getListById]);
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Opuściłeś listę');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	const onUpdateMembersList = useCallback(() => {
		mutate({ _id: contextualMenu?.elementId, member: authData?._id });
	}, [contextualMenu, authData]);

	return (
		<>
			<div className='flex flex-col text-base'>
				{getListsLoading && <Loader className='m-auto' />}
				{list?.map((list: IList) => (
					<MenuListItem key={list?._id} listItem={list} isNavClosed={isNavClosed} />
				))}
			</div>
			{isVisible && (
				<ContextualModal title='Czy chcesz usunąć listę?' onHandleAction={removeList} contextualType={ContextMenuOpion.remove_list} />
			)}
			{isVisible && (
				<ContextualModal title='' onHandleAction={() => {}} contextualType={ContextMenuOpion.sharing_options} isActionButtonHidden>
					<SharingOptions
						addInvitationTokenToListLoading={addInvitationTokenToListLoading}
						addInvitationTokenToListMutation={addInvitationTokenToListMutation}
					/>
				</ContextualModal>
			)}
			{isVisible && (
				<ContextualModal
					title='Czy chcesz opuścić tę listę?'
					onHandleAction={onUpdateMembersList}
					contextualType={ContextMenuOpion.leave_list}
				/>
			)}
		</>
	);
};

export const Lists = memo(ListsComponents);
