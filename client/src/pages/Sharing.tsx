import { FC } from 'react';
import { useQuery } from 'react-query';
import { getStringAfterCharacter } from '../utils/utilsFunctions';
import { getListDatatoShareAction, IShareLitDetails } from '../actions/sharing';
import { Mail } from 'react-feather';
import { JoinToList } from '../components/SharingOptions/JoinToList';
import { RedirectToList } from '../components/SharingOptions/RedirectToList';
import { QueryKey } from '../enums';

export const Sharing: FC = () => {
	const invitationTokenUrl = getStringAfterCharacter(sessionStorage.getItem('invitationTokenUrl') || '');
	const { data: list, isLoading: listDataLoading } = useQuery<IShareLitDetails | undefined>([QueryKey.getListDatatoShare, invitationTokenUrl], () =>
		getListDatatoShareAction({ invitationToken: invitationTokenUrl || '' })
	);

	return (
		<div className='absolute top-0 left-0 right-0 w-full h-full bg-white flex items-center justify-center'>
			<div className='flex items-center justify-center flex-col'>
				<Mail size={160} color={'#cccccc'} strokeWidth={1} />
				{list?.isMemberAddedToList ? (
					<RedirectToList listDataLoading={listDataLoading} list={list} />
				) : (
					<JoinToList listDataLoading={listDataLoading} list={list} />
				)}
			</div>
		</div>
	);
};
