import { FC } from 'react';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { ROUTE } from '../enums';
import { Loader } from 'react-feather';
import { useRecoilValue } from 'recoil';
import { loadingState, searchResultState } from '../atoms/serching';
import { buildUrl } from '../utils/paths';
import { TasksList } from '../components/Tasks/TasksList';

export const Searching: FC = () => {
	const searchResults = useRecoilValue(searchResultState);
	const isLoading = useRecoilValue(loadingState);

	return (
		<Board>
			<Toolbar name={'Wyszukiwanie'} colorType={'blue'} />

			<h2 className='pl-2 font-semibold text-lg'>Zadania</h2>
			{isLoading ? (
				<Loader className='m-auto' />
			) : (
				<div className='overflow-y-scroll h-[600px] mt-4'>
					<TasksList tasks={searchResults} redirectUrl={`${buildUrl(ROUTE.search)}/`} />
					{!searchResults?.length && <div className='ml-2'>nie naleziono wyniku</div>}
				</div>
			)}
		</Board>
	);
};
