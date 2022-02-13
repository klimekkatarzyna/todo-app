import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../AuthContext';

export const useSharingData = (membersIds: string[] | undefined) => {
	const { authData } = useContext<AuthContextType>(AuthContext);

	const isUserListOwner = membersIds?.some(owner => owner === authData?._id);

	return {
		authData,
		isUserListOwner,
	};
};
