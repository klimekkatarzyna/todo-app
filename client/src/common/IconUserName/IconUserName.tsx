import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getUserAction } from '../../api/user';
import { QueryKey } from '../../enums';
import { Loader } from 'react-feather';
import { getFirstLetters } from '../../utils/utilsFunctions';
import { IUserData } from '@kkrawczyk/todo-common';

export const IconUserName: FC<{ member: string | undefined; isFullNameVisible?: boolean; userName?: string }> = ({
	member,
	isFullNameVisible,
	userName,
}) => {
	const { data, isLoading } = useQuery<IUserData | undefined>([QueryKey.getUser, member], () => getUserAction(member), { enabled: !!member });
	const name = useMemo(() => getFirstLetters(data?.username || userName), [data?.username, userName]);

	return (
		<div className='flex items-center p-0 task-details-button-style'>
			<div className='flex flex-row text-xs items-center w-7 h-7 bg-red rounded-full mr-2'>
				{isLoading && <Loader />}
				<span className='text-white m-auto font-semibold'>{name}</span>
			</div>
			{isFullNameVisible && <span>{data?.username || userName}</span>}
		</div>
	);
};
