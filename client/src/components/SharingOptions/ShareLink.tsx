import { IList } from '@kkrawczyk/todo-common';
import React, { FC, RefObject, useCallback, useEffect, useRef } from 'react';
import { ROUTE } from '../../enums';
import { Button } from '../Button/Button';

export const ShareLink: FC<{ listDataResponse: IList | undefined }> = ({ listDataResponse }) => {
	const inputRef: RefObject<HTMLInputElement> = useRef(null);

	const copyToClipboard = useCallback(async (e: React.MouseEvent) => {
		const input = inputRef?.current;

		if (input) {
			input.select();
			document.execCommand('copy');
		}

		if (navigator) {
			try {
				await navigator.share({
					title: 'url',
					url: inputRef?.current?.value,
				});
			} catch (error) {
				console.error(error);
			}
		}
	}, []);

	return (
		<>
			<input
				className='w-full border-none outline-none text-sm bg-inherit text-blue'
				value={`${process.env.REACT_APP_API_URL_LOCAL}${ROUTE.sharing}?invitationToken=${listDataResponse?.invitationToken}`}
				ref={inputRef}
				readOnly
				type='text'
				name='shareLink'
			/>
			<Button primary onClick={copyToClipboard}>
				{'Kopiuj link'}
			</Button>
		</>
	);
};
