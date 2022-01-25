import React, { FC, useContext, useEffect } from 'react';
import { ContextualMenuContext } from '../../ContextualMenuProvider';
import { IListItem } from '../../interfaces/list';
import { useGenerateInvitationToken } from './useGenerateInvitationToken';
import { GenerateTokenView } from './GenerateTokenView';
import { ShareTokenView } from './ShareTokenView';
import { useQuery } from 'react-query';
import { AuthContext, AuthContextType } from '../../AuthContext';

interface ISharingOptionsProps {
	getListByIdData: IListItem | undefined;
	isLoadingAddInvitationTokenToList: boolean;
	addInvitationTokenToListMutation: any;
	getListById: any;
}

export const SharingOptions: FC<ISharingOptionsProps> = ({
	getListById,
	isLoadingAddInvitationTokenToList,
	addInvitationTokenToListMutation,
	getListByIdData,
}) => {
	const { authData } = useContext<AuthContextType>(AuthContext);
	const { contextualMenu } = useContext(ContextualMenuContext);
	const { invitationToken, onGenerateInvitationToken } = useGenerateInvitationToken();
	// const { data, isLoading: getListByIdLoading } = useQuery<IListItem | undefined>(['getListById', contextualMenu?.elementId], getListById);
	console.log(getListByIdData);
	// console.log({ data });

	useEffect(() => {
		if (!!getListByIdData?.invitationToken) return;
		addInvitationTokenToListMutation({ listId: contextualMenu?.elementId, invitationToken: invitationToken, owner: authData?.email });
	}, [contextualMenu?.elementId, invitationToken, getListByIdData?.invitationToken]);

	return (
		<div>
			{!!getListByIdData?.invitationToken ? (
				<ShareTokenView invitationToken={getListByIdData?.invitationToken || ''} />
			) : (
				<GenerateTokenView isLoading={isLoadingAddInvitationTokenToList} onGenerateInvitationToken={onGenerateInvitationToken} />
			)}
		</div>
	);
};
