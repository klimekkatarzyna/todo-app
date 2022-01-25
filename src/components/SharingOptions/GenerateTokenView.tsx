import React, { FC } from 'react';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

interface IGenerateTokenViewProps {
	isLoading: boolean;
	onGenerateInvitationToken: () => void;
}

export const GenerateTokenView: FC<IGenerateTokenViewProps> = ({ isLoading, onGenerateInvitationToken }) => {
	return (
		<div>
			<p>Zaproś inne osoby. Gdy dołączą zostaną tutaj zaproszone.</p>
			{isLoading && <Loader />}
			<Button primary onClick={onGenerateInvitationToken}>
				{'Utwórz link zaproszenia'}
			</Button>
		</div>
	);
};
