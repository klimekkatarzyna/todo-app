import { IList } from '@kkrawczyk/todo-common';
import React, { FC, RefObject, useCallback, useRef } from 'react';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

interface IShareLink {
	listDataResponse: IList;
}

export const ShareLink: FC<IShareLink> = ({ listDataResponse }) => {
	const inputRef: RefObject<HTMLInputElement> = useRef(null);

	const copyToClipboard = useCallback((e: React.MouseEvent) => {
		const input = inputRef?.current;

		if (input) {
			input.select();
			document.execCommand('copy');
		}
	}, []);

	return (
		<>
			<Input
				type='text'
				value={`${process.env.REACT_APP_CONFIG_API}/tasks/sharing?invitationToken=${listDataResponse?.invitationToken}`}
				inputRef={inputRef}
				readOnly
				name='shareLink'
			/>
			<Button primary onClick={copyToClipboard}>
				{'Kopiuj link'}
			</Button>
		</>
	);
};
