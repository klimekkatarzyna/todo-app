import React, { FC, RefObject, useCallback, useContext, useRef } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { ContextualMenuContext } from '../../ContextualMenuProvider';
import { ContextualMenuOpion } from '../../enums';
import { useSharingData } from '../../hooks/useSharingData';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Modal } from '../Modal/Modal';

const Wrapper = styled.div`
	h3 {
		color: ${COLOURS.darkerGrey};
		font-size: 0.9rem;
	}
	> p {
		display: flex;
		align-items: center;
		position: relative;
		margin-left: 0.5rem;
		font-size: 0.9rem;
		&:before {
			content: '';
			position: relative;
			left: -10px;
			width: 40px;
			height: 40px;
			background-color: ${COLOURS.red};
			border-radius: 50%;
		}
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
	invitationToken: string | undefined;
	owner: string | undefined;
	onNextStep: () => void;
	membersIds: string[] | undefined;
}

export const ShareTokenView: FC<IShareTokenViewProps> = ({ invitationToken, owner, onNextStep, membersIds }) => {
	const inputRef: RefObject<HTMLInputElement> = useRef(null);
	const { isUserListOwner } = useSharingData(membersIds);

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
			<p>
				{owner} <span>{'Właściciel'}</span>
			</p>
			{membersIds && membersIds.map(member => <p key={member}>{member}</p>)} {/*TODO: display name of user or email*/}
			<Input
				type='text'
				value={`http://localhost:8080/tasks/sharing?invitationToken=${invitationToken}`} // TODO: https on prod
				inputRef={inputRef}
				readOnly
				name='shareLink'
			/>
			<Button primary onClick={copyToClipboard}>
				{'Kopiuj link'}
			</Button>
			{!isUserListOwner ? (
				<ShareButton onClick={onNextStep}>{'Zarządzaj dostępem'}</ShareButton>
			) : (
				<LeaveButton onClick={() => {}}>{'Opuść listę'}</LeaveButton>
			)}
			<Modal title='Czy chcesz opuścić listę?' onHandleAction={() => {}} contextualType={ContextualMenuOpion.leave_list} />
		</Wrapper>
	);
};
