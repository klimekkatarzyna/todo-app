import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { ContextMenuContext } from '../../providers/ContextMenuProvider';
import { useGenerateInvitationToken } from '../../hooks/useGenerateInvitationToken';
import { GenerateTokenView } from './GenerateTokenView';
import { ShareTokenView } from './ShareTokenView';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AuthContext, AuthContextType } from '../../AuthProvider';
import { AccessManagement } from './AccessManagement';
import { getListByIdAction } from '../../api/sharing';
import { IList } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../enums';
import { addInvitationTokenToListAction } from '../../api/lists';
import { useParams } from 'react-router-dom';
import { IUseParams } from '../../interfaces/app';

export const SharingOptions: FC = () => {
	const query = useQueryClient();
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { contextualMenu } = useContext(ContextMenuContext);
	const { invitationToken, onGenerateInvitationToken } = useGenerateInvitationToken();
	const [step, setStep] = useState<number>(1);
	const { listId } = useParams<IUseParams>();

	const listID = contextualMenu?.elementId || listId;

	const { data } = useQuery<IList | undefined>([QueryKey.getListById, listID], () => getListByIdAction({ _id: listID }), { enabled: !!listID });

	const { mutateAsync: addInvitationTokenToListMutation, isLoading: addInvitationTokenToListLoading } = useMutation(
		addInvitationTokenToListAction,
		{
			onSuccess: () => {
				query.invalidateQueries([QueryKey.getListById]);
			},
		}
	);

	useEffect(() => {
		(async () => {
			if (!invitationToken) return;
			await addInvitationTokenToListMutation({ _id: listID, invitationToken: invitationToken, owner: authData?.email });
		})();
	}, [listID, data?.invitationToken, invitationToken]);

	const onNextStep = useCallback(() => {
		setStep(step + 1);
	}, [step, setStep]);

	const onPrevStep = useCallback(() => {
		setStep(step - 1);
	}, [step, setStep]);

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
