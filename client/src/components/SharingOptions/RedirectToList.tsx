import { FC, useCallback } from 'react';
import { Loader } from 'react-feather';
import { Button } from '../Button/Button';
import { IShareLitDetails } from '../../actions/sharing';
import { useSwitchToFirstListItem } from '../../hooks/useSwitchToFirstListItem';

export const RedirectToList: FC<{ list: IShareLitDetails | undefined; listDataLoading: boolean }> = ({ list, listDataLoading }) => {
	const { onHandleSwitchToFirstListItem } = useSwitchToFirstListItem(list?.listData._id);

	const redirectToList = useCallback(() => {
		onHandleSwitchToFirstListItem();
	}, [onHandleSwitchToFirstListItem]);

	return (
		<>
			<h1 className='text-xl font-extralight m-4'>Już dołączono!</h1>

			<p className='font-extralight'>
				{listDataLoading ? <Loader className='animate-spin m-auto' /> : `Dołączono już do listy`}{' '}
				<strong>{`${list?.listData?.title}`}</strong>
			</p>

			<Button primary onClick={redirectToList}>
				{'Otwórz'}
			</Button>
		</>
	);
};
