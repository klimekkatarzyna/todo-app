import React, { FC, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { Button } from '../Button/Button';
import { ArrowLeft } from '@styled-icons/feather/ArrowLeft';
import { http } from '../../utils/http';
import * as api from '../../services';
import { ContextualMenuContext } from '../../ContextualMenuProvider';

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
`;

interface IAccessManagementProps {
	invitationToken: string | undefined;
	onPrevStep: () => void;
}

export const AccessManagement: FC<IAccessManagementProps> = ({ invitationToken, onPrevStep }) => {
	const { contextualMenu } = useContext(ContextualMenuContext);

	const removeInvitationAction = useCallback(async () => {
		const response = await http(`${api.removeInvitation}/${contextualMenu?.elementId}`, 'DELETE');
		return response;
	}, [contextualMenu?.elementId]);

	return (
		<Wrapper>
			<BackButton onClick={onPrevStep}>
				<ArrowLeft />
			</BackButton>
			<h3>{'Link do zapraszania'}</h3>
			<div>{`http://localhost:8080/tasks/sharing?invitationToken=${invitationToken}`}</div>
			<Button secondary onClick={() => {}}>
				{'Zatrzymaj udostępnianie'}
			</Button>
		</Wrapper>
	);
};
