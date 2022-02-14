import React, { FC, useCallback } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { X } from '@styled-icons/feather';
import { http } from '../../utils/http';
import * as api from '../../services';
import { useMutation, useQueryClient } from 'react-query';
import { Loader } from '../Loader/Loader';

const Wrapper = styled.div`
	display: flex;
	align-items: center;

	> button {
		margin-left: auto;
		cursor: pointer;
	}
`;

export const Dot = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	margin-left: 0.5rem;
	font-size: 0.9rem;
	&:before {
		content: '';
		position: relative;
		left: -10px;
		width: 40px;
		height: 40px;
		background-color: ${COLOURS.red};
		border-radius: 50%;
	}
`;

const RemoveButton = styled.button``;

interface IMemberProps {
	member: string;
	listId: string | undefined;
}

export const Member: FC<IMemberProps> = ({ member, listId }) => {
	const query = useQueryClient();
	const onRemoveMemberAction = useCallback(async () => {
		const response = await http(`${api.removeMemberFromList}`, 'PATCH', {
			listId,
			member,
		});
		return response.body;
	}, [member]);

	const {
		mutate: onRemoveMemberMutation,
		isLoading: onRemoveMemberLoading,
		isError,
	} = useMutation(onRemoveMemberAction, {
		onSuccess: () => {
			query.invalidateQueries(['getListById']);
		},
	});

	return (
		<Wrapper>
			<Dot />
			<p key={member}>{member}</p>
			<RemoveButton onClick={() => onRemoveMemberMutation()}>
				<X />
			</RemoveButton>
			{onRemoveMemberLoading && <Loader />}
		</Wrapper>
	);
};
