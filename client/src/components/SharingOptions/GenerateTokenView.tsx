import React, { FC } from 'react';
import { Button } from '../Button/Button';

export const GenerateTokenView: FC<{ isLoading: boolean; onGenerateInvitationToken: () => void }> = ({ isLoading, onGenerateInvitationToken }) => {
	return (
		<div>
			<p className='mt-4 mb-4'>Zaproś inne osoby. Gdy dołączą zostaną tutaj zaproszone.</p>
			<Button className='button-primary' onClick={onGenerateInvitationToken} isLoading={isLoading}>
				{'Utwórz link zaproszenia'}
			</Button>
		</div>
	);
};
