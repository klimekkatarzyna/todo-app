import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';

export const useProviderAuth = () => {
	return useContext(AuthContext);
};
