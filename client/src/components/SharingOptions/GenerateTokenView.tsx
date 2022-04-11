import React, { FC } from 'react';
import { Button } from '../Button/Button';

interface IGenerateTokenViewProps {
	isLoading: boolean;
	onGenerateInvitationToken: () => void;
}

export const GenerateTokenView: FC<IGenerateTokenViewProps> = ({ isLoading, onGenerateInvitationToken }) => {
	return (
		<div>
			<h2 className='text-center'>
				<strong>Udostępnij listę</strong>
			</h2>
			<p>Zaproś inne osoby. Gdy dołączą zostaną tutaj zaproszone.</p>
			<Button primary onClick={onGenerateInvitationToken} isLoading={isLoading}>
				{'Utwórz link zaproszenia'}
			</Button>
		</div>
	);
};
