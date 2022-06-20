import { FC, useCallback } from 'react';
import { IList } from '@kkrawczyk/todo-common';
import { useHistory } from 'react-router-dom';
import { useSharingData } from '../../hooks/useSharingData';
import { Loader } from 'react-feather';
import { ROUTE } from '../../enums';
import { buildUrl } from '../../utils/paths';
import { useList } from '../../hooks/useList';

export const RemoveMember: FC<{ listDataResponse: IList | undefined; onNextStep: () => void }> = ({ listDataResponse, onNextStep }) => {
	const history = useHistory();
	const { isOwner, authData } = useSharingData(listDataResponse?.userId);
	const { updateMembersListLoading, updateMembersListMutation } = useList();

	const leaveList = useCallback(() => {
		updateMembersListMutation({ _id: listDataResponse?._id, member: authData?._id });
		history.push(buildUrl(ROUTE.home));
	}, [listDataResponse, authData, history]);

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
					onClick={leaveList}
					className='flex p4 cursor-pointer text-blue bg-inherit text-center border-y-2 border-solid mt-4 mx-auto mb-0 hover:bg-white'>
					{'Opuść listę'}
					{updateMembersListLoading && <Loader />}
				</button>
			)}
		</>
	);
};
