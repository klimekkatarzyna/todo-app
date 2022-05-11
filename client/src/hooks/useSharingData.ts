import { useContext, useMemo } from 'react';
import { AuthContext, AuthContextType } from '../AuthProvider';

export const useSharingData = (member: string | undefined) => {
	const { authData } = useContext<AuthContextType>(AuthContext);

	const isOwner = useMemo(() => member === authData?._id, [member, authData]);

	return {
		isOwner,
		authData,
	};
};
