import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { X, Loader } from 'react-feather';
import { updateMembersList } from '../../actions/sharing';
import { useSharingData } from '../../hooks/useSharingData';
import { IList } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../enums';
import toast from 'react-hot-toast';
import { DisplayMember } from './DisplayMember';
import { IQueryError } from '../../interfaces/app';

interface IMemberProps {
	listDataResponse: IList;
	member: string;
}

export const Member: FC<IMemberProps> = ({ listDataResponse, member }) => {
	const query = useQueryClient();
	const { isOwner } = useSharingData(listDataResponse?.userId);

	const { mutate, isLoading, isError } = useMutation(updateMembersList, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.getListById]);
			query.invalidateQueries([QueryKey.lists]);
			toast.success('Użytkownik usunięty z listy');
		},
		onError: (error: IQueryError) => {
			toast.error(`Coś poszlo nie tak: ${error.err.message}`);
		},
	});

	return (
		<div className='flex items-center my-2 mx-0'>
			<DisplayMember member={member} />
			{isOwner && (
				<button onClick={() => mutate({ _id: listDataResponse?._id, member })} className='ml-auto cursor-pointer absolute right-5'>
					<X className='icon-style' />
				</button>
			)}
			{isLoading && <Loader />}
		</div>
	);
};
