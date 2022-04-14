import { FC, useCallback } from 'react';
import { IList } from '@kkrawczyk/todo-common';
import { useSharingData } from '../../hooks/useSharingData';
import { useMutation, useQueryClient } from 'react-query';
import { removeMemberAction } from '../../actions/sharing';
import { Loader } from 'react-feather';

interface IRemoveMember {
	listDataResponse: IList;
	onNextStep: () => void;
}

export const RemoveMember: FC<IRemoveMember> = ({ listDataResponse, onNextStep }) => {
	const query = useQueryClient();
	const { isOwner, authData } = useSharingData(listDataResponse?.userId);

	const { mutate, isLoading, isError } = useMutation(removeMemberAction, {
		onSuccess: () => {
			query.invalidateQueries(['getListById']);
			query.invalidateQueries(['lists']);
		},
	});

	const onRemoveMember = useCallback(() => {
		mutate({ _id: listDataResponse?._id, member: authData?._id });
	}, [listDataResponse, authData]);

	return (
		<>
			{isOwner ? (
				!!listDataResponse?.members?.length && (
					<button
						onClick={onNextStep}
						className='flex p4 cursor-pointer text-blue bg-inherit text-center border-none border-y-2 border-solid mt-4 mx-auto mb-0 text-red hover:bg-white hover:border'>
						{'Zarządzaj dostępem'}
					</button>
				)
			) : (
				<button
					onClick={onRemoveMember}
					className='flex p4 cursor-pointer text-blue bg-inherit text-center border-y-2 border-solid mt-4 mx-auto mb-0 hover:bg-white'>
					{'Opuść listę'}
					{isLoading && <Loader />}
				</button>
			)}
		</>
	);
};
