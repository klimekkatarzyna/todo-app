import React, { FC, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { Button } from '../Button/Button';
import { ArrowLeft } from '@styled-icons/feather/ArrowLeft';
import { http } from '../../utils/http';
import * as api from '../../services';
import { IList } from '@kkrawczyk/todo-common';
import { useMutation, useQueryClient } from 'react-query';
import { Loader } from '../Loader/Loader';
import { removeInvitationAction } from '../../actions/sharing';

const Wrapper = styled.div`
	h3 {
		color: ${COLOURS.darkerGrey};
		font-size: 0.9rem;
	}
	div {
		width: 300px;
		word-break: break-all;
		text-align: center;
		margin-bottom: 1rem;
		font-weight: 300;
	}
`;

const BackButton = styled.button`
	background-color: inherit;
	border: none;
	cursor: pointer;
	position: absolute;
	top: 20px;
	svg {
		width: 20px;
	}
`;

interface IAccessManagementProps {
	listDataResponse: IList;
	onPrevStep: () => void;
}

export const AccessManagement: FC<IAccessManagementProps> = ({ listDataResponse, onPrevStep }) => {
	const query = useQueryClient();

	const { mutate, isLoading, isError } = useMutation(removeInvitationAction, {
		onSuccess: () => {
			query.invalidateQueries(['getListById']);
		},
	});

	return (
		<Wrapper>
			<BackButton onClick={onPrevStep}>
				<ArrowLeft />
			</BackButton>
			<h2 className='text-center'>
				<strong>Zarządzanie dostępem</strong>
			</h2>
			<h3>{'Link do zapraszania'}</h3>
			<div>{`${process.env.REACT_APP_CONFIG_API}/tasks/sharing?invitationToken=${listDataResponse?.invitationToken}`}</div>
			<Button secondary onClick={() => mutate({ _id: listDataResponse?._id })}>
				{'Zatrzymaj udostępnianie'}
				{isLoading && <Loader />}
			</Button>
		</Wrapper>
	);
};
