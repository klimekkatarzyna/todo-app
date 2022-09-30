import { FC } from 'react';
import { useTranslation } from 'react-i18next';

export const NotFound: FC = () => {
	const { t } = useTranslation();
	return (
		<div className='flex items-center flex-col flex-1 m-2'>
			<h1 className='text-[5rem]'>404</h1>
			<p>{t('page-not-found')}</p>
		</div>
	);
};
