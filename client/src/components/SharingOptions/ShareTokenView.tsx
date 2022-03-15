import React, { FC, RefObject, useCallback, useContext, useRef } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { ContextualMenuOpion } from '../../enums';
import { useSharingData } from '../../hooks/useSharingData';
import { IListItem } from '../../interfaces/list';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';
import { Member, Dot } from './Member';

const Wrapper = styled.div`
	h3 {
		color: ${COLOURS.darkerGrey};
		font-size: 0.9rem;
	}

	> div {
		display: flex;
		align-items: center;
	}

	span {
		color: ${COLOURS.darkerGrey};
		font-size: 0.8rem;
		margin-left: auto;
	}
`;

const ShareButton = styled.button`
	padding: 1rem;
	text-align: center;
	cursor: pointer;
	margin: 1rem auto 0;
	border-top: 1px solid ${COLOURS.border};
	&:hover {
		background-color: ${COLOURS.border};
	}
	background-color: inherit;
	border: none;
	cursor: pointer;
	color: ${COLOURS.blue};
	display: flex;
`;

const LeaveButton = styled.button`
	padding: 1rem;
	text-align: center;
	cursor: pointer;
	margin: 1rem auto 0;
	border-top: 1px solid ${COLOURS.border};
	&:hover {
		background-color: ${COLOURS.border};
	}
	background-color: inherit;
	border: none;
	cursor: pointer;
	color: ${COLOURS.red};
	display: flex;
`;
interface IShareTokenViewProps {
	onNextStep: () => void;
	listDataResponse: IListItem;
}

export const ShareTokenView: FC<IShareTokenViewProps> = ({ onNextStep, listDataResponse }) => {
	const inputRef: RefObject<HTMLInputElement> = useRef(null);
	const { isUserListOwner } = useSharingData(listDataResponse?.members);
	const { isVisible } = useContext(ModalVisibilityContext);

	const copyToClipboard = useCallback((e: React.MouseEvent) => {
		const input = inputRef?.current;

		if (input) {
			input.select();
			document.execCommand('copy');
		}
	}, []);

	return (
		<Wrapper>
			<h3>Członkowie listy</h3>
			<div>
				<Dot /> {listDataResponse?.owner} <span>{'Właściciel'}</span>
			</div>
			{listDataResponse?.members?.map(member => (
				<Member key={member} member={member} listId={listDataResponse._id} />
			))}{' '}
			{/*TODO: display name of user or email*/}
			<Input
				type='text'
				value={`${process.env.REACT_APP_CONFIG_API}/tasks/sharing?invitationToken=${listDataResponse?.invitationToken}`} // TODO: https on prod
				inputRef={inputRef}
				readOnly
				name='shareLink'
			/>
			<Button primary onClick={copyToClipboard}>
				{'Kopiuj link'}
			</Button>
			{!isUserListOwner ? (
				!!listDataResponse?.members?.length && <ShareButton onClick={onNextStep}>{'Zarządzaj dostępem'}</ShareButton>
			) : (
				<LeaveButton onClick={() => {}}>{'Opuść listę'}</LeaveButton>
			)}
			{isVisible && <Modal title='Czy chcesz opuścić listę?' onHandleAction={() => {}} contextualType={ContextualMenuOpion.leave_list} />}
		</Wrapper>
	);
};
