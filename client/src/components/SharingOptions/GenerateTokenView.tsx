import { FC } from 'react';
import { Button } from '../../common/Button/Button';
import { useTranslation } from 'react-i18next';

export const GenerateTokenView: FC<{ isLoading: boolean; onGenerateInvitationToken: () => void }> = ({ isLoading, onGenerateInvitationToken }) => {
	const { t } = useTranslation();
	return (
		<div>
			<p className='mt-4 mb-4'>{t('generate-token-modal')}</p>
			<Button className='button-primary' onClick={onGenerateInvitationToken} isLoading={isLoading}>
				{t('generete-link-sharing')}
			</Button>
		</div>
	);
};
