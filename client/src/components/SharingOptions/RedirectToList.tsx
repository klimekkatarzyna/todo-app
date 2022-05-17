import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Loader } from 'react-feather';
import { Button } from '../Button/Button';
import { IShareLitDetails } from '../../actions/sharing';
import { buildUrl } from '../../utils/paths';
import { ROUTE } from '../../enums';

interface IRedirectToList {
	list: IShareLitDetails | undefined;
	listDataLoading: boolean;
}

export const RedirectToList: FC<IRedirectToList> = ({ list, listDataLoading }) => {
	const history = useHistory();

	const redirectToList = useCallback(() => {
		history.push(buildUrl(ROUTE.listsDetails, { listId: list?.listData._id || '' }));
	}, [list]);

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
