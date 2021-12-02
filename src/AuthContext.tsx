import { createContext } from 'react';
import { IUserData } from './interfaces/app';

export interface AuthContextType {
	isCheckSessionLoading: boolean;
	authData: IUserData | undefined;
	setAuthData: React.Dispatch<React.SetStateAction<IUserData | undefined>>;
	sessionChecked: boolean;
	setSessionChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

// better do it in separate file because the values return by the context will be use in few files
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
