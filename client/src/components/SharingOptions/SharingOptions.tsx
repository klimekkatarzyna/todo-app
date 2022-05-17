import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { useGenerateInvitationToken } from '../../hooks/useGenerateInvitationToken';
import { GenerateTokenView } from './GenerateTokenView';
import { ShareTokenView } from './ShareTokenView';
import { useQuery } from 'react-query';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { AccessManagement } from './AccessManagement';
import { getListByIdAction } from '../../actions/sharing';
import { IList } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../enums';

interface ISharingOptionsProps {
	addInvitationTokenToListLoading: boolean;
	addInvitationTokenToListMutation: ({ _id, invitationToken, owner }: IList) => void;
}

export const SharingOptions: FC<ISharingOptionsProps> = ({ addInvitationTokenToListLoading, addInvitationTokenToListMutation }) => {
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { contextualMenu } = useContext(ContextMenuContext);
	const { invitationToken, onGenerateInvitationToken } = useGenerateInvitationToken();
	const [step, setStep] = useState<number>(1);

	const { data, isLoading, error } = useQuery<IList | undefined>(
		[QueryKey.getListById, contextualMenu?.elementId],
		() => getListByIdAction({ _id: contextualMenu?.elementId }),
		{ enabled: !!contextualMenu?.elementId }
	);

	useEffect(() => {
		// TODO: zle sie wyswietla kto jest ownerem po stronie zaproszonej osoby bo caly czas leci ten endpoint  fix me!
		if (!!data?.invitationToken) return;
		addInvitationTokenToListMutation({ _id: contextualMenu?.elementId, invitationToken: invitationToken, owner: authData?.email });
	}, [contextualMenu?.elementId, invitationToken]);

	const onNextStep = useCallback(() => {
		setStep(step + 1);
	}, [step]);

	const onPrevStep = useCallback(() => {
		setStep(step - 1);
	}, [step]);

	return (
		<div>
			{!!data?.invitationToken ? (
				<>
					{step === 1 && <ShareTokenView onNextStep={onNextStep} listDataResponse={data} />}
					{step === 2 && <AccessManagement listDataResponse={data} onPrevStep={onPrevStep} />}
				</>
			) : (
				<GenerateTokenView isLoading={addInvitationTokenToListLoading} onGenerateInvitationToken={onGenerateInvitationToken} />
			)}
		</div>
	);
};
