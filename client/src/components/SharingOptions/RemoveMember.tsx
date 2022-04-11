import React, { FC, useCallback } from 'react';
import { IList } from '@kkrawczyk/todo-common';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { useSharingData } from '../../hooks/useSharingData';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getListByIdAction, removeMemberAction } from '../../actions/sharing';
import { Loader } from 'react-feather';

const ShareButton = styled.button`
	padding: 1rem;
	text-align: center;
	cursor: pointer;
	margin: 1rem auto 0;
	border-top: 1px solid ${COLOURS.border};
	&:hover {
		background-color: ${COLOURS.border};
	}
	background-color: inherit;
	border: none;
	cursor: pointer;
	color: ${COLOURS.blue};
	display: flex;
`;

const LeaveButton = styled.button`
	padding: 1rem;
	text-align: center;
	cursor: pointer;
	margin: 1rem auto 0;
	border-top: 1px solid ${COLOURS.border};
	&:hover {
		background-color: ${COLOURS.border};
	}
	background-color: inherit;
	border: none;
	cursor: pointer;
	color: ${COLOURS.red};
	display: flex;
`;

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
				!!listDataResponse?.members?.length && <ShareButton onClick={onNextStep}>{'Zarządzaj dostępem'}</ShareButton>
			) : (
				<LeaveButton onClick={onRemoveMember}>
					{'Opuść listę'}
					{isLoading && <Loader />}
				</LeaveButton>
			)}
		</>
	);
};
