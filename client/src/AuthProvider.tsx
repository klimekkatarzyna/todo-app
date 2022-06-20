import React, { FC, useEffect, useMemo, useState, createContext } from 'react';
import { useQuery } from 'react-query';
import { useAuthorization } from './hooks/useAuthorization';
import { IIUserDataResponse } from './interfaces/app';
import { HttpResponse } from './utils/http';
import { IUserData } from '@kkrawczyk/todo-common';
import { QueryKey } from './enums';

export interface AuthContextType {
	isCheckSessionLoading: boolean;
	authData: IUserData | undefined;
	setAuthData: React.Dispatch<React.SetStateAction<IUserData | undefined>>;
	sessionChecked: boolean;
	setSessionChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

// better do it in separate file because the values return by the context will be use in few files
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [authData, setAuthData] = useState<IUserData | undefined>(undefined);
	const [sessionChecked, setSessionChecked] = useState<boolean>(false);

	const { checkSession } = useAuthorization();
	const { isLoading: isCheckSessionLoading } = useQuery<HttpResponse<IIUserDataResponse> | undefined>(QueryKey.checkSession, checkSession);

	useEffect(() => {
		(async () => {
			const response = await checkSession();
			setAuthData(response?.body?.user);
			if (!response) return;
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
