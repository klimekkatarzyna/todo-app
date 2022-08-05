import React, { FC } from 'react';
import { Button } from '../Button/Button';

export const GenerateTokenView: FC<{ isLoading: boolean; onGenerateInvitationToken: () => void }> = ({ isLoading, onGenerateInvitationToken }) => {
	return (
		<div>
			<h2 className='text-center'>
				<strong>Udostępnij listę</strong>
			</h2>
			<p>Zaproś inne osoby. Gdy dołączą zostaną tutaj zaproszone.</p>
			<Button className='button-primary' onClick={onGenerateInvitationToken} isLoading={isLoading}>
				{'Utwórz link zaproszenia'}
			</Button>
		</div>
	);
};
