import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { ContextualMenuContext } from '../../ContextualMenuProvider';
import { useGenerateInvitationToken } from '../../hooks/useGenerateInvitationToken';
import { GenerateTokenView } from './GenerateTokenView';
import { ShareTokenView } from './ShareTokenView';
import { UseMutateFunction, useQuery } from 'react-query';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { HttpResponse } from '../../utils/http';
import { AccessManagement } from './AccessManagement';
import { getListByIdAction } from '../../actions/sharing';

interface ISharingOptionsProps {
	addInvitationTokenToListLoading: boolean;
	addInvitationTokenToListMutation: UseMutateFunction<HttpResponse<unknown>, unknown, any, unknown>;
}

export const SharingOptions: FC<ISharingOptionsProps> = ({ addInvitationTokenToListLoading, addInvitationTokenToListMutation }) => {
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { contextualMenu } = useContext(ContextualMenuContext);
	const { invitationToken, onGenerateInvitationToken } = useGenerateInvitationToken();
	const [step, setStep] = useState<number>(1);

	const { data, isLoading, error } = useQuery(['getListById', contextualMenu?.elementId], () => getListByIdAction(contextualMenu?.elementId));

	useEffect(() => {
		// TODO: zle sie wyswietla kto jest ownerem po stronie zaproszonej osoby bo caly czas leci ten endpoint  fix me!
		if (!!data?.body?.invitationToken) return;
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
			{!!data?.body?.invitationToken ? (
				<>
					{step === 1 && <ShareTokenView onNextStep={onNextStep} listDataResponse={data?.body} />}
					{step === 2 && <AccessManagement listDataResponse={data?.body} onPrevStep={onPrevStep} />}
				</>
			) : (
				<GenerateTokenView isLoading={addInvitationTokenToListLoading} onGenerateInvitationToken={onGenerateInvitationToken} />
			)}
		</div>
	);
};
