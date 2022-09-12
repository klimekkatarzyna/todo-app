import { FC } from 'react';
import { useQuery } from 'react-query';
import { getStringAfterCharacter } from '../utils/utilsFunctions';
import { getListDatatoShareAction, IShareLitDetails } from '../api/sharing';
import { Mail } from 'react-feather';
import { JoinToList } from '../components/SharingOptions/JoinToList';
import { RedirectToList } from '../components/SharingOptions/RedirectToList';
import { QueryKey } from '../enums';

export const Sharing: FC = () => {
	const invitationTokenUrl = getStringAfterCharacter(sessionStorage.getItem('invitationTokenUrl') || '', '=');
	const { data, isLoading } = useQuery<IShareLitDetails | undefined>(
		[QueryKey.getListDatatoShare, invitationTokenUrl],
		() => getListDatatoShareAction({ invitationToken: invitationTokenUrl || '' }),
		{ enabled: !!invitationTokenUrl }
	);

	return (
		<div className='absolute top-0 left-0 right-0 w-full h-full bg-white flex items-center justify-center z-20'>
			<div className='flex items-center justify-center flex-col'>
				<Mail size={160} color={'#cccccc'} strokeWidth={1} />
				{data?.isMemberAddedToList ? (
					<RedirectToList listDataLoading={isLoading} list={data} />
				) : (
					<JoinToList listDataLoading={isLoading} list={data} />
				)}
			</div>
		</div>
	);
};
