import React, { FC, RefObject, useCallback, useContext, useRef } from 'react';
import { AuthContext, AuthContextType } from '../../AuthContext';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

interface IShareTokenViewProps {
	invitationToken: string;
}

export const ShareTokenView: FC<IShareTokenViewProps> = ({ invitationToken }) => {
	const inputRef: RefObject<HTMLInputElement> = useRef(null);
	const { authData } = useContext<AuthContextType>(AuthContext);

	const copyToClipboard = useCallback((e: React.MouseEvent) => {
		const input = inputRef?.current;

		if (input) {
			input.select();
			document.execCommand('copy');
		}
	}, []);

	return (
		<div>
			<p>Członkowie listy</p>
			{authData?.username} {'Właściciel'}
			<Input type='text' value={invitationToken} inputRef={inputRef} readOnly name='shareLink' />
			<Button primary onClick={copyToClipboard}>
				{'Kopiuj link'}
			</Button>
		</div>
	);
};
