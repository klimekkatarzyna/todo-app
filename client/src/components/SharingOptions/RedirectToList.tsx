import { FC, useCallback } from 'react';
import { Loader } from 'react-feather';
import { Button } from '../../common/Button/Button';
import { IShareLitDetails } from '../../api/sharing';
import { useSwitchToFirstListItem } from '../../hooks/useSwitchToFirstListItem';
import { useTranslation } from 'react-i18next';

export const RedirectToList: FC<{ list: IShareLitDetails | undefined; listDataLoading: boolean }> = ({ list, listDataLoading }) => {
	const { t } = useTranslation();
	const { onHandleSwitchToFirstListItem } = useSwitchToFirstListItem(list?.listData._id);

	const redirectToList = useCallback(() => {
		onHandleSwitchToFirstListItem();
	}, [onHandleSwitchToFirstListItem]);

	return (
		<>
			<h1 className='text-xl font-extralight m-4'>Już dołączono!</h1>

			<p className='font-extralight'>
				{listDataLoading ? <Loader className='animate-spin m-auto' /> : t('joined-to-list')} <strong>{`${list?.listData?.title}`}</strong>
			</p>

			<Button onClick={redirectToList} className='button-primary'>
				{t('open')}
			</Button>
		</>
	);
};
