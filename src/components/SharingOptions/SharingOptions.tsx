import React, { FC, useContext, useEffect } from 'react';
import { ContextualMenuContext } from '../../ContextualMenuProvider';
import { IListItem } from '../../interfaces/list';
import { useGenerateInvitationToken } from './useGenerateInvitationToken';
import { GenerateTokenView } from './GenerateTokenView';
import { ShareTokenView } from './ShareTokenView';
import { useQuery } from 'react-query';
import { AuthContext, AuthContextType } from '../../AuthContext';

interface ISharingOptionsProps {
	listData: IListItem | undefined;
	addInvitationTokenToListLoading: boolean;
	addInvitationTokenToListMutation: any;
	getListByIdAction: any;
}

export const SharingOptions: FC<ISharingOptionsProps> = ({
	getListByIdAction,
	addInvitationTokenToListLoading,
	addInvitationTokenToListMutation,
	listData,
}) => {
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { contextualMenu } = useContext(ContextualMenuContext);
	const { invitationToken, onGenerateInvitationToken } = useGenerateInvitationToken();
	// const { data, isLoading: getListByIdLoading } = useQuery<IListItem | undefined>(['getListById', contextualMenu?.elementId], getListById);
	console.log(listData);
	// console.log({ data });

	useEffect(() => {
		if (!!listData?.invitationToken) return;
		addInvitationTokenToListMutation({ listId: contextualMenu?.elementId, invitationToken: invitationToken, owner: authData?.email });
	}, [contextualMenu?.elementId, invitationToken, listData?.invitationToken]);

	return (
		<div>
			{!!listData?.invitationToken ? (
				<ShareTokenView invitationToken={listData?.invitationToken || ''} />
			) : (
				<GenerateTokenView isLoading={addInvitationTokenToListLoading} onGenerateInvitationToken={onGenerateInvitationToken} />
			)}
		</div>
	);
};
