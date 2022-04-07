import { FC, memo, useCallback, useContext } from 'react';
import { MenuListItem } from '../../MenuListItem/MenuListItem';
import { Loader } from '../../Loader/Loader';
import { Modal } from '../../Modal/Modal';
import { ContextualMenuOpion } from '../../../enums';
import { SharingOptions } from '../../SharingOptions/SharingOptions';
import { useMutation, useQueryClient } from 'react-query';
import { addInvitationTokenToListAction } from '../../../actions/lists';
import { ModalVisibilityContext } from '../../../ModalVisibilityProvider';
import { IList } from '@kkrawczyk/todo-common';
import { useList } from '../../../hooks/useList';
import { useRecoilValue } from 'recoil';
import { listsState } from '../../../atoms';
import { removeMemberAction } from '../../../actions/sharing';
import { ContextualMenuContext } from '../../../ContextualMenuProvider';
import { AuthContext } from '../../../AuthProvider';

interface ILists {
	isNavClosed: boolean;
}

const ListsComponents: FC<ILists> = ({ isNavClosed }) => {
	const query = useQueryClient();
	const { isVisible } = useContext(ModalVisibilityContext);
	const { getListsLoading, removeListMutation } = useList();
	const list = useRecoilValue(listsState);
	const { contextualMenu } = useContext(ContextualMenuContext);
	const { authData } = useContext(AuthContext);

	const { mutate: addInvitationTokenToListMutation, isLoading: addInvitationTokenToListLoading } = useMutation(addInvitationTokenToListAction, {
		onSuccess: () => {
			query.invalidateQueries(['getListById']);
		},
	});

	const removeList = useCallback(() => {
		removeListMutation({ _id: contextualMenu?.elementId });
	}, [contextualMenu]);

	const { mutate, isLoading, isError } = useMutation(removeMemberAction, {
		onSuccess: () => {
			query.invalidateQueries(['getListById']);
			query.invalidateQueries(['lists']);
		},
	});

	const onRemoveMember = useCallback(() => {
		mutate({ _id: contextualMenu?.elementId, member: authData?._id });
	}, [contextualMenu, authData]);

	return (
		<>
			<div className='flex flex-col text-base'>
				{getListsLoading && <Loader />}
				{list?.map((list: IList) => (
					<MenuListItem key={list?._id} listItem={list} isNavClosed={isNavClosed} />
				))}
			</div>
			{isVisible && <Modal title='Czy chcesz usunąć listę?' onHandleAction={removeList} contextualType={ContextualMenuOpion.remove_list} />}
			{isVisible && (
				<Modal title='' onHandleAction={() => {}} contextualType={ContextualMenuOpion.sharing_options} isActionButtonHidden>
					<SharingOptions
						addInvitationTokenToListLoading={addInvitationTokenToListLoading}
						addInvitationTokenToListMutation={addInvitationTokenToListMutation}
					/>
				</Modal>
			)}
			{isVisible && (
				<Modal title='Czy chcesz opuścić tę listę?' onHandleAction={onRemoveMember} contextualType={ContextualMenuOpion.leave_list} />
			)}
		</>
	);
};

export const Lists = memo(ListsComponents);
