import React, { FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { AuthContext } from './AuthContext';
import useAuthorization from './hooks/useAuthorization';
import { IResponseStatus, IUserData } from './interfaces/app';
import { HttpResponse } from './utils/http';

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
    const [authData, setAuthData] = useState<HttpResponse<IUserData>>({} as HttpResponse<IUserData>);

    const { authenticateUserRequest, loginRequest, checkSession, logoutRequest } = useAuthorization();
    const { mutate: signUpMutate, data, status } = useMutation(authenticateUserRequest, {
        onSuccess: (data) => {
            setAuthData(data)
        }
    });
    const { isLoading: LoginIsLoading, mutate: loginMutate, isError, data: LoginData, status: LoginStatus } = useMutation(loginRequest, {
        onSuccess: (data) => {
            setAuthData(data)
        }
    });
    const { isLoading: LogoutIsLoading, mutate: logoutMutate, data: loginoutData } = useMutation(logoutRequest, {
        onSuccess: (data) => {
           setAuthData(data)
        }
    });

    const signUp = useCallback(async (username: string, email: string, password: string) => {
        try {
            await signUpMutate({ username: username, email: email, password: password });
        } catch {
            //error TODO: handle error
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        try {
            await loginMutate({ email: email, password: password });
        } catch {
            //error TODO: handle error
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await logoutMutate();
        } catch {
            //error TODO: handle error
        }
    }, []);
    
   console.log('???', LoginIsLoading, isError, LoginData, LoginStatus);
    
    return (
        <AuthContext.Provider value={{ signUp, login, logout, checkSession, authData, LoginIsLoading, setAuthData, loginoutData}}>
            {children}
        </AuthContext.Provider>
    );
};