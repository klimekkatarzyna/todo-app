import { FC } from 'react';
import { useQuery } from 'react-query';
import { getUserAction } from '../../actions/user';
import { QueryKey } from '../../enums';
import { Loader } from 'react-feather';

interface IDisplayMemberProps {
	member: string | undefined;
}

export const DisplayMember: FC<IDisplayMemberProps> = ({ member }) => {
	const { data, isLoading } = useQuery([QueryKey.getUser, member], () => getUserAction(member));

	return (
		<button className='flex flex-row items-center p-1 hover:bg-hoverColor cursor-pointer w-full'>
			<div className='flex items-center relative mr-2 text-sm before:contents w-7 h-7 bg-red rounded-full' />
			{isLoading && <Loader />}
			<p key={member}>{data?.username}</p>
		</button>
	);
};
