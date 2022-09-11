import React, { FC, useEffect, useMemo, useState, createContext } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { IIUserDataResponse } from './interfaces/app';
import { HttpResponse } from './utils/http';
import { IUserData } from '@kkrawczyk/todo-common';
import { QueryKey, ROUTE } from './enums';
import { checkSessionAction } from './api/user';
import { useNavigate, useLocation } from 'react-router-dom';
import { buildUrl } from './utils/paths';
import toast from 'react-hot-toast';

export interface AuthContextType {
	isCheckSessionLoading: boolean;
	authData: IUserData | undefined;
	setAuthData: React.Dispatch<React.SetStateAction<IUserData | undefined>>;
	sessionChecked: boolean;
	setSessionChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [authData, setAuthData] = useState<IUserData | undefined>(undefined);
	const [sessionChecked, setSessionChecked] = useState<boolean>(false);
	const navigate = useNavigate();
	const location = useLocation();

	const query = useQueryClient();

	const { isLoading: isCheckSessionLoading, data } = useQuery<HttpResponse<IIUserDataResponse> | undefined>(
		QueryKey.checkSession,
		checkSessionAction,
		{
			onSuccess: () => {
				navigate(location.pathname);
			},
		}
	);

	useEffect(() => {
		query.setDefaultOptions({
			queries: {
				refetchOnWindowFocus: false,
				onError: (error: any): any => {
					if (error?.error === 401) {
						setAuthData(undefined);
						setSessionChecked(false);
						navigate(buildUrl(ROUTE.login), { replace: true });
					}
					if (error?.error === 401) return;
					toast.error(error?.message);
				},
			},
			mutations: {
				onError: (error: any): any => {
					if (error?.error === 401) {
						setAuthData(undefined);
						setSessionChecked(false);
						navigate(buildUrl(ROUTE.login), { replace: true });
					}
					if (error?.error === 401) return;
					toast.error(error?.message);
				},
			},
		});
	}, [navigate, query]);

	useEffect(() => {
		if (data) {
			navigate(location.pathname, { replace: true });
			setAuthData(data.data?.user);
			setSessionChecked(true);
		} else {
			setAuthData(undefined);
			setSessionChecked(false);
			navigate(location.pathname, { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, sessionChecked]);

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
