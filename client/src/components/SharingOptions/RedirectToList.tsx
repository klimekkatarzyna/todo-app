import { FC, useCallback } from 'react';
import { Loader } from 'react-feather';
import { Button } from '../Button/Button';
import { IShareLitDetails } from '../../actions/sharing';
import { useSwitchToFirstListItem } from '../../hooks/useSwitchToFirstListItem';

interface IRedirectToList {
	list: IShareLitDetails | undefined;
	listDataLoading: boolean;
}

export const RedirectToList: FC<IRedirectToList> = ({ list, listDataLoading }) => {
	const { onHandleSwitchToFirstListItem } = useSwitchToFirstListItem(list?.listData._id);

	const redirectToList = useCallback(() => {
		onHandleSwitchToFirstListItem();
	}, []);

	return (
		<>
			<h1 className='text-xl font-extralight m-4'>Już dołączono!</h1>

			<p className='font-extralight'>
				{listDataLoading ? <Loader className='m-auto' /> : `Dołączono już do listy`} <strong>{`${list?.listData?.title}`}</strong>
			</p>

			<Button primary onClick={redirectToList}>
				{'Otwórz'}
			</Button>
		</>
	);
};
