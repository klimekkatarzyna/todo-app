import { FC } from 'react';
import { Loader } from 'react-feather';
import { useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { addUserToMemberOfListAction, IShareLitDetails } from '../../api/sharing';
import { Button } from '../../common/Button/Button';
import { getStringAfterCharacter } from '../../utils/utilsFunctions';
import { QueryKey } from '../../enums';
import { useSwitchToFirstListItem } from '../../hooks/useSwitchToFirstListItem';
import { useTranslation } from 'react-i18next';

export const JoinToList: FC<{ listDataLoading: boolean; list: IShareLitDetails | undefined }> = ({ listDataLoading, list }) => {
	const { t } = useTranslation();
	const query = useQueryClient();
	const location = useLocation();
	const { onHandleSwitchToFirstListItem } = useSwitchToFirstListItem(list?.listData._id);

	const { mutate, isLoading } = useMutation(addUserToMemberOfListAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.checkSession]);
			query.invalidateQueries([QueryKey.lists]);
			onHandleSwitchToFirstListItem();
		},
	});

	return (
		<>
			<h1 className='text-xl font-extralight m-4'>{t('join-to-list')}</h1>

			<p className='font-extralight'>
				{listDataLoading ? <Loader className='animate-spin m-auto' /> : `Użytkownik`}{' '}
				{t('join-to-list-subtitle', {
					owner: list?.listData?.owner,
					listName: list?.listData?.title,
				})}
			</p>

			<Button className='button-primary' onClick={() => mutate(getStringAfterCharacter(location.search, '='))}>
				{t('join-to-list-button')}
				{isLoading && <Loader className='animate-spin ml-2' />}
			</Button>
		</>
	);
};
