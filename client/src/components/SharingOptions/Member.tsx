import { FC } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { X, Loader } from 'react-feather';
import { updateMembersList } from '../../actions/sharing';
import { useSharingData } from '../../hooks/useSharingData';
import { IList } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { getUserAction } from '../../actions/user';

interface IMemberProps {
	listDataResponse: IList;
	member: string;
}

export const Member: FC<IMemberProps> = ({ listDataResponse, member }) => {
	const query = useQueryClient();
	const { isOwner } = useSharingData(listDataResponse?.userId);
	const { data: user, isLoading: isLoadingUser } = useQuery([QueryKey.getUser, member], () => getUserAction(member));

	const { mutate, isLoading, isError } = useMutation(updateMembersList, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.getListById]);
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Użytkownik usunięty z listy');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	return (
		<div className='flex items-center my-2 mx-0'>
			<div className='flex items-center relative mr-2 text-sm before:contents w-7 h-7 bg-red rounded-full' />
			{isLoadingUser && <Loader />}
			<p key={member}>{user?.username}</p>
			{isOwner && (
				<button onClick={() => mutate({ _id: listDataResponse?._id, member })} className='ml-auto cursor-pointer'>
					<X className='icon-style' />
				</button>
			)}
			{isLoading && <Loader />}
		</div>
	);
};
