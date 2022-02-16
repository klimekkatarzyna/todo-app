import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { ContextualMenuContext } from '../../ContextualMenuProvider';
import { IListItem } from '../../interfaces/list';
import { useGenerateInvitationToken } from './useGenerateInvitationToken';
import { GenerateTokenView } from './GenerateTokenView';
import { ShareTokenView } from './ShareTokenView';
import { UseMutateFunction, useQuery } from 'react-query';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import * as api from '../../services';
import { http, HttpResponse } from '../../utils/http';
import { AccessManagement } from './AccessManagement';

interface ISharingOptionsProps {
	addInvitationTokenToListLoading: boolean;
	addInvitationTokenToListMutation: UseMutateFunction<HttpResponse<unknown>, unknown, any, unknown>;
}

export const SharingOptions: FC<ISharingOptionsProps> = ({ addInvitationTokenToListLoading, addInvitationTokenToListMutation }) => {
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { contextualMenu } = useContext(ContextualMenuContext);
	const { invitationToken, onGenerateInvitationToken } = useGenerateInvitationToken();
	const [step, setStep] = useState<number>(1);

	const getListByIdAction = useCallback(async () => {
		const response = await http<IListItem[]>(`${api.getListById}/${contextualMenu?.elementId}`, 'GET');
		return response.body?.[0];
	}, [contextualMenu?.elementId]);

	const {
		data: listDataResponse,
		isLoading: listDataLoading,
		error: getListByIdError,
	} = useQuery<IListItem | undefined>(['getListById', contextualMenu?.elementId], getListByIdAction);

	useEffect(() => {
		// TODO: zle sie wyswietla kto jest ownerem po stronie zaproszonej osoby bo caly czas leci ten endpoint  fix me!
		if (!!listDataResponse?.invitationToken) return;
		addInvitationTokenToListMutation({ listId: contextualMenu?.elementId, invitationToken: invitationToken, owner: authData?.email });
	}, [contextualMenu?.elementId, invitationToken]);

	const onNextStep = useCallback(() => {
		setStep(step + 1);
	}, [step]);

	const onPrevStep = useCallback(() => {
		setStep(step - 1);
	}, [step]);

	return (
		<div>
			{!!listDataResponse?.invitationToken ? (
				<>
					{step === 1 && <ShareTokenView onNextStep={onNextStep} listDataResponse={listDataResponse} />}
					{step === 2 && <AccessManagement listDataResponse={listDataResponse} onPrevStep={onPrevStep} />}
				</>
			) : (
				<GenerateTokenView isLoading={addInvitationTokenToListLoading} onGenerateInvitationToken={onGenerateInvitationToken} />
			)}
		</div>
	);
};
