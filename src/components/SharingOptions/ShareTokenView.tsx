import React, { FC, RefObject, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

const Wrapper = styled.div`
	h3 {
		color: ${COLOURS.darkerGrey};
		font-size: 0.9rem;
	}
	> p {
		display: flex;
		justify-content: space-between;
	}
	span {
		color: ${COLOURS.darkerGrey};
		font-size: 0.9rem;
	}
`;

const ShareButton = styled.div`
	padding: 1rem;
	text-align: center;
	cursor: pointer;
	margin-top: 1rem;
	border-top: 1px solid ${COLOURS.border};
	&:hover {
		background-color: ${COLOURS.border};
	}
	> button {
		background-color: inherit;
		border: none;
		cursor: pointer;
		color: ${COLOURS.blue};
	}
`;

interface IShareTokenViewProps {
	invitationToken: string;
	owner: string | undefined;
	onNextStep: () => void;
}

export const ShareTokenView: FC<IShareTokenViewProps> = ({ invitationToken, owner, onNextStep }) => {
	const inputRef: RefObject<HTMLInputElement> = useRef(null);

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
			<Input type='text' value={invitationToken} inputRef={inputRef} readOnly name='shareLink' />
			<Button primary onClick={copyToClipboard}>
				{'Kopiuj link'}
			</Button>
			<ShareButton>
				<button onClick={onNextStep}>{'Zarządzaj dostępem'}</button>
			</ShareButton>
		</Wrapper>
	);
};
