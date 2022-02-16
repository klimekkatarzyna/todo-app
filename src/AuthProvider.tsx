import React, { FC, useEffect, useMemo, useState, createContext } from 'react';
import { useQuery } from 'react-query';
import { useAuthorization } from './hooks/useAuthorization';
import { IIUserDataResponse, IUserData } from './interfaces/app';
import { HttpResponse } from './utils/http';

export interface AuthContextType {
	isCheckSessionLoading: boolean;
	authData: IUserData | undefined;
	setAuthData: React.Dispatch<React.SetStateAction<IUserData | undefined>>;
	sessionChecked: boolean;
	setSessionChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

// better do it in separate file because the values return by the context will be use in few files
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface IAuthProvider {
	children: React.ReactNode;
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
	const [authData, setAuthData] = useState<IUserData | undefined>(undefined);
	const [sessionChecked, setSessionChecked] = useState<boolean>(false);

	const { checkSession } = useAuthorization();
	const { isLoading: isCheckSessionLoading } = useQuery<HttpResponse<IIUserDataResponse> | undefined>('checkSession', checkSession);

	useEffect(() => {
		(async () => {
			const response = await checkSession();
			setAuthData(response?.body?.user);
			setSessionChecked(true);
		})();
	}, []);

	const value = useMemo(() => {
		return {
			isCheckSessionLoading,
			authData,
			setAuthData,
			sessionChecked,
			setSessionChecked,
		};
	}, [isCheckSessionLoading, authData, setAuthData, sessionChecked, setSessionChecked]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
