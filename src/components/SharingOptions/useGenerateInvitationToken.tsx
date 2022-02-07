import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useGenerateInvitationToken = () => {
	const [invitationToken, setInvitationToken] = useState<undefined | string>(undefined);

	const onGenerateInvitationToken = useCallback(() => {
		const token = uuidv4();
		setInvitationToken(token);
	}, []);

	return {
		onGenerateInvitationToken,
		invitationToken,
	};
};
