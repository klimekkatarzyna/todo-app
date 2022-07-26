import { FC } from 'react';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { ROUTE } from '../enums';
import { Loader } from 'react-feather';
import { useRecoilValue } from 'recoil';
import { loadingState, searchResultState } from '../atoms/serching';
import { buildUrl } from '../utils/paths';
import { TasksList } from '../components/Tasks/TasksList';
import { AppColor } from '@kkrawczyk/todo-common';
import { useTranslation } from 'react-i18next';

export const Searching: FC = () => {
	const { t } = useTranslation();
	const searchResults = useRecoilValue(searchResultState);
	const isLoading = useRecoilValue(loadingState);

	return (
		<Board>
			<Toolbar name={'Wyszukiwanie'} colorType={AppColor.blue} />

			<h2 className='pl-2 font-semibold text-lg'>{t('searching-title')}</h2>
			{isLoading ? (
				<Loader className='animate-spin m-auto' />
			) : (
				<div className='mt-4'>
					<TasksList tasks={searchResults} redirectUrl={`${buildUrl(ROUTE.search)}/`} />
					{!searchResults?.length && <div className='ml-2'>{t('no-result')}</div>}
				</div>
			)}
		</Board>
	);
};
