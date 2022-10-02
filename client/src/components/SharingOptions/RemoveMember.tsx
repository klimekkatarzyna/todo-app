import { FC, useCallback } from 'react';
import { IList } from '@kkrawczyk/todo-common';
import { useNavigate } from 'react-router-dom';
import { useSharingData } from '../../hooks/useSharingData';
import { Loader } from 'react-feather';
import { ROUTE } from '../../enums';
import { buildUrl } from '../../utils/paths';
import { useList } from '../../hooks/useList';
import { useTranslation } from 'react-i18next';

export const RemoveMember: FC<{ listDataResponse: IList | undefined; onNextStep: () => void }> = ({ listDataResponse, onNextStep }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { isOwner, authData } = useSharingData(listDataResponse?.userId);
	const { updateMembersListLoading, updateMembersListMutation } = useList();

	const leaveList = useCallback(() => {
		updateMembersListMutation({ _id: listDataResponse?._id, member: authData?._id });
		navigate(buildUrl(ROUTE.home));
	}, [listDataResponse, authData, navigate, updateMembersListMutation]);

	return (
		<>
			{isOwner ? (
				!!listDataResponse?.members?.length && (
					<button
						onClick={onNextStep}
						className='flex p4 cursor-pointer bg-inherit text-center border-none border-y-2 mt-4 mx-auto mb-0 text-red hover:bg-white hover:border'>
						{t('manage-access')}
					</button>
				)
			) : (
				<button
					onClick={leaveList}
					className='flex p4 cursor-pointer text-blue bg-inherit text-center border-y-2 border-solid mt-4 mx-auto mb-0 hover:bg-white'>
					{t('leave-list')}
					{updateMembersListLoading && <Loader />}
				</button>
			)}
		</>
	);
};
