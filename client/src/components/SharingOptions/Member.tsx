import { FC } from 'react';
import { X, Loader } from 'react-feather';
import { useSharingData } from '../../hooks/useSharingData';
import { IList } from '@kkrawczyk/todo-common';
import { DisplayMember } from './DisplayMember';
import { useList } from '../../hooks/useList';

interface IMemberProps {
	listDataResponse: IList;
	member: string;
}

export const Member: FC<IMemberProps> = ({ listDataResponse, member }) => {
	const { isOwner } = useSharingData(listDataResponse?.userId);
	const { updateMembersListLoading, updateMembersListMutation } = useList();

	return (
		<div className='flex items-center my-2 mx-0'>
			<DisplayMember member={member} />
			{isOwner && (
				<button
					onClick={() => updateMembersListMutation({ _id: listDataResponse?._id, member })}
					className='ml-auto cursor-pointer absolute right-5'>
					<X className='icon-style' />
				</button>
			)}
			{updateMembersListLoading && <Loader />}
		</div>
	);
};
