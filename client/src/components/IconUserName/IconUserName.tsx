import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { getUserAction } from '../../actions/user';
import { QueryKey } from '../../enums';
import { Loader } from 'react-feather';
import { getFirstLetters } from '../../utils/utilsFunctions';

interface IIconUserNameProps {
	member: string | undefined;
	isFullNameVisible?: boolean;
}

export const IconUserName: FC<IIconUserNameProps> = ({ member, isFullNameVisible }) => {
	const { data, isLoading } = useQuery([QueryKey.getUser, member], () => getUserAction(member));
	const name = useMemo(() => getFirstLetters(data?.username), [data?.username]);

	return (
		<div className='flex items-center p-0 task-details-button-style'>
			<div className='flex flex-row text-xs items-center w-7 h-7 bg-red rounded-full mr-2'>
				{isLoading && <Loader />}
				<span className='text-white m-auto font-semibold'>{name}</span>
			</div>
			{isFullNameVisible && <span>{data?.username}</span>}
		</div>
	);
};
