import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../AuthContext';

export const useSharingData = (ownerId: string[] | undefined) => {
	const { authData } = useContext<AuthContextType>(AuthContext);

	const isOwner = ownerId?.some(owner => owner === authData?._id);

	return {
		authData,
		isOwner,
	};
};
