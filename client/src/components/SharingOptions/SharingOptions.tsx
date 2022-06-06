import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { useGenerateInvitationToken } from '../../hooks/useGenerateInvitationToken';
import { GenerateTokenView } from './GenerateTokenView';
import { ShareTokenView } from './ShareTokenView';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { AccessManagement } from './AccessManagement';
import { getListByIdAction } from '../../actions/sharing';
import { IList } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../enums';
import { addInvitationTokenToListAction } from '../../actions/lists';

export const SharingOptions: FC = () => {
	const query = useQueryClient();
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { contextualMenu } = useContext(ContextMenuContext);
	const { invitationToken, onGenerateInvitationToken } = useGenerateInvitationToken();
	const [step, setStep] = useState<number>(1);

	const { data, isLoading, error } = useQuery<IList | undefined>(
		[QueryKey.getListById, contextualMenu?.elementId],
		() => getListByIdAction({ _id: contextualMenu?.elementId }),
		{ enabled: !!contextualMenu?.elementId }
	);

	const { mutateAsync: addInvitationTokenToListMutation, isLoading: addInvitationTokenToListLoading } = useMutation(
		addInvitationTokenToListAction,
		{
			onSuccess: () => {
				query.invalidateQueries([QueryKey.getListById]);
			},
		}
	);

	useEffect(() => {
		// TODO: zle sie wyswietla kto jest ownerem po stronie zaproszonej osoby bo caly czas leci ten endpoint  fix me!
		(async () => {
			if (!invitationToken) return;
			await addInvitationTokenToListMutation({ _id: contextualMenu?.elementId, invitationToken: invitationToken, owner: authData?.email });
		})();
	}, [contextualMenu?.elementId, data?.invitationToken, invitationToken]);

	const onNextStep = useCallback(() => {
		setStep(step + 1);
	}, [step]);

	const onPrevStep = useCallback(() => {
		setStep(step - 1);
	}, [step]);

	return (
		<div>
			{!!data?.invitationToken || !!invitationToken ? (
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
