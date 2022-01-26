import { FC } from 'react';
import styled from 'styled-components';
import { IListItem } from '../../../interfaces/list';
import { useList } from '../useList';
import { MenuListItem } from '../../MenuListItem/MenuListItem';
import { Loader } from '../../Loader/Loader';
import { Modal } from '../../Modal/Modal';
import { ContextualMenuOpion } from '../../../enums';
import { SharingOptions } from '../../SharingOptions/SharingOptions';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 0.9rem;
`;

interface ILists {
	isNavClosed: boolean;
}

export const Lists: FC<ILists> = ({ isNavClosed }) => {
	const { getListsLoading, listsResponse, removeListMutation, addInvitationTokenToListMutation, addInvitationTokenToListLoading } = useList();

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
		</>
	);
};
