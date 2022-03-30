import { FC, memo, useContext } from 'react';
import styled from 'styled-components';
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

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.9rem;
`;

interface ILists {
	isNavClosed: boolean;
}

const ListsComponents: FC<ILists> = ({ isNavClosed }) => {
	const query = useQueryClient();
	const { isVisible } = useContext(ModalVisibilityContext);
	const { getListsLoading, removeListMutation } = useList();
	const list = useRecoilValue(listsState);

	const { mutate: addInvitationTokenToListMutation, isLoading: addInvitationTokenToListLoading } = useMutation(addInvitationTokenToListAction, {
		onSuccess: () => {
			query.invalidateQueries(['getListById']);
		},
	});

	return (
		<>
			<Wrapper>
				{getListsLoading && <Loader />}
				{list?.map((list: IList) => (
					<MenuListItem key={list?._id} listItem={list} isNavClosed={isNavClosed} />
				))}
			</Wrapper>
			{isVisible && (
				<Modal title='Czy chcesz usunąć listę?' onHandleAction={removeListMutation} contextualType={ContextualMenuOpion.remove_list} />
			)}
			{isVisible && (
				<Modal title='' onHandleAction={() => {}} contextualType={ContextualMenuOpion.sharing_options} isActionButtonHidden>
					<SharingOptions
						addInvitationTokenToListLoading={addInvitationTokenToListLoading}
						addInvitationTokenToListMutation={addInvitationTokenToListMutation}
					/>
				</Modal>
			)}
			{isVisible && <Modal title='Czy chcesz opuścić tę listę?' onHandleAction={() => {}} contextualType={ContextualMenuOpion.leave_list} />}
		</>
	);
};

export const Lists = memo(ListsComponents);
