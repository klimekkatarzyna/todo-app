import { IList } from '@kkrawczyk/todo-common';
import React, { FC, RefObject, useCallback, useRef } from 'react';
import { ROUTE } from '../../enums';
import { Button } from '../../common/Button/Button';

export const ShareLink: FC<{ listDataResponse: IList | undefined }> = ({ listDataResponse }) => {
	const inputRef: RefObject<HTMLInputElement> = useRef(null);

	const copyToClipboard = useCallback(async (e: React.MouseEvent) => {
		const input = inputRef?.current;

		if (input) {
			input.select();
			document.execCommand('copy');
		}

		if (navigator?.share !== undefined) {
			try {
				await navigator?.share({
					title: 'url',
					url: inputRef?.current?.value,
				});
			} catch (error) {
				console.error(error);
			}
		}
	}, []);

	return (
		<div className='mt-4'>
			<input
				className='w-full border-none outline-none text-sm bg-inherit text-blue'
				value={`${process.env.REACT_APP_API_URL_LOCAL}${ROUTE.sharing}?invitationToken=${listDataResponse?.invitationToken}`}
				ref={inputRef}
				readOnly
				type='text'
				name='shareLink'
			/>
			<Button onClick={copyToClipboard} className='button-primary mt-4'>
				{'Kopiuj link'}
			</Button>
		</div>
	);
};
