import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../AuthProvider';

export const useSharingData = (membersIds: string[] | string | undefined) => {
	const { authData } = useContext<AuthContextType>(AuthContext);

	const isUserListOwner = typeof membersIds === 'string' ? membersIds === authData?._id : membersIds?.some(owner => owner === authData?._id);

	return {
		authData,
		isUserListOwner,
	};
};
