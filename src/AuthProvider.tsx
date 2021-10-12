import React, { FC, useCallback } from 'react';
import { useMutation } from 'react-query';
import { AuthContext } from './AuthContext';
import useAuthorization from './hooks/useAuthorization';
import { IResponseStatus, IUserData } from './interfaces';
import { HttpResponse } from './utils/http';

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
    const { authenticateUser, loginUser, checkSession, logoutUser, authData, setAuthData } = useAuthorization();
    const { mutate: signUpMutate, data, status } = useMutation(authenticateUser);
    const { isLoading: LoginIsLoading, mutate: loginMutate, data: loginData } = useMutation(loginUser);
    const { mutate: checkSessionMutate } = useMutation(checkSession);

    const token = localStorage.getItem('token');

    const signUp = useCallback((username: string, email: string, password: string) => {
        signUpMutate({ username: username, email: email, password: password });

        if (!data?.auth && status !== IResponseStatus.success) return;
        checkSessionMutate(localStorage.getItem('token') as string);
        //error TODO: handle error
    }, [data, signUpMutate, status]);

    const login = useCallback((email: string, password: string) => {
        loginMutate({ email: email, password: password });

        //error TODO: handle error
    }, [data, loginMutate, status, loginData]);

    const logout = useCallback(() => {
        logoutUser(token as string);
        setAuthData({} as HttpResponse<IUserData>);
    }, [authData]);

    return (
        <AuthContext.Provider value={{ signUp, login, logout, checkSession, authData, LoginIsLoading}}>
            {children}
        </AuthContext.Provider>
    );
};