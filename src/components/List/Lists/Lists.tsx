import { FC } from 'react';
import styled from 'styled-components';
import { IListItem, IListResponse } from '../../../interfaces/list';
import { MenuListItem } from '../../MenuListItem/MenuListItem';
import { Loader } from '../../Loader/Loader';
import { Modal } from '../../Modal/Modal';
import { ContextualMenuOpion } from '../../../enums';
import { SharingOptions } from '../../SharingOptions/SharingOptions';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addInvitationTokenToListAction, deleteListAction, getListsAction } from '../../../actions/lists';
import { HttpResponse } from '../../../utils/http';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.9rem;
`;

interface ILists {
	isNavClosed: boolean;
}

export const Lists: FC<ILists> = ({ isNavClosed }) => {
	const query = useQueryClient();
	const {
		isLoading: getListsLoading,
		data: listsResponse,
		error: getListsError,
	} = useQuery<HttpResponse<IListResponse> | undefined>('lists', getListsAction); // TODO: cache it

	const { mutate: removeListMutation } = useMutation(deleteListAction, {
		onSuccess: () => {
			query.invalidateQueries(['lists']);
		},
	});

	const { mutate: addInvitationTokenToListMutation, isLoading: addInvitationTokenToListLoading } = useMutation(addInvitationTokenToListAction, {
		onSuccess: () => {
			query.invalidateQueries(['getListById']);
		},
	});

	return (
		<>
			<Wrapper>
				{getListsLoading && <Loader />}
				{listsResponse?.body?.lists?.map((list: IListItem) => (
					<MenuListItem key={list?._id} listItem={list} isNavClosed={isNavClosed} />
				))}
			</Wrapper>
			{/* TODO: react portal for modals ? */}
			<Modal title='Czy chcesz usunąć listę?' onHandleAction={removeListMutation} contextualType={ContextualMenuOpion.remove_list} />
			<Modal title='Udostępnij listę' onHandleAction={() => {}} contextualType={ContextualMenuOpion.sharing_options}>
				<SharingOptions
					addInvitationTokenToListLoading={addInvitationTokenToListLoading}
					addInvitationTokenToListMutation={addInvitationTokenToListMutation}
				/>
			</Modal>
			<Modal title='Czy chcesz opuścić tę listę?' onHandleAction={() => {}} contextualType={ContextualMenuOpion.leave_list} />
		</>
	);
};
