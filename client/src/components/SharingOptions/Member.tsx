import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { X, Loader } from 'react-feather';
import { removeMemberAction } from '../../actions/sharing';
import { useSharingData } from '../../hooks/useSharingData';
import { IList } from '@kkrawczyk/todo-common';

interface IMemberProps {
	listDataResponse: IList;
	member: string;
}

export const Member: FC<IMemberProps> = ({ listDataResponse, member }) => {
	const query = useQueryClient();
	const { isOwner } = useSharingData(listDataResponse?.userId);

	const { mutate, isLoading, isError } = useMutation(removeMemberAction, {
		onSuccess: () => {
			query.invalidateQueries(['getListById']);
			query.invalidateQueries(['lists']);
		},
	});

	return (
		<div className='flex items-center my-2 mx-0'>
			<div className='flex items-center relative mr-2 text-sm before:contents w-7 h-7 bg-red rounded-full' />
			<p key={member}>{member}</p>
			{isOwner && (
				<button onClick={() => mutate({ _id: listDataResponse?._id, member })} className='ml-auto cursor-pointer'>
					<X size={20} />
				</button>
			)}
			{isLoading && <Loader />}
		</div>
	);
};
