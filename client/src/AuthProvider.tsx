import React, { FC, useEffect, useMemo, useState, createContext } from 'react';
import { useQuery } from 'react-query';
import { IIUserDataResponse } from './interfaces/app';
import { HttpResponse } from './utils/http';
import { IUserData } from '@kkrawczyk/todo-common';
import { QueryKey, ROUTE } from './enums';
import { checkSessionAction } from './actions/user';
import { useHistory } from 'react-router-dom';
import { buildUrl } from './utils/paths';

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
	const history = useHistory();

	const { isLoading: isCheckSessionLoading, data } = useQuery<HttpResponse<IIUserDataResponse> | undefined>(
		QueryKey.checkSession,
		checkSessionAction,
		{
			onSuccess: () => {
				history.push(history.location.pathname);
			},
			onError: () => {
				history.push(buildUrl(ROUTE.login));
			},
		}
	);

	useEffect(() => {
		if (data) {
			setAuthData(data.body?.user);
			setSessionChecked(true);
		} else {
			history.push(buildUrl(ROUTE.login));
		}
	}, [data]);

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
