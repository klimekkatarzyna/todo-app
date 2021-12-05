import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

export const useProviderAuth = () => {
	return useContext(AuthContext);
};
