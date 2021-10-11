import React, { createContext, FC, useCallback, useMemo } from 'react';
import { useMutation } from 'react-query';
import useAuthorization from './hooks/useAuthorization';
import { IAuthData, IResponseStatus } from './interfaces';
import { HttpResponse } from './utils/http';

interface AuthContextType {
    signUp: (username: string, email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: () => void;
    authData: HttpResponse<IAuthData>;
    isUserAutorized: boolean | undefined;
}
  
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
    const { authenticateUser, loginUser, checkSession, logoutUser, authData } = useAuthorization();
    const { isLoading, mutate: signUpMutate, data, error, status } = useMutation(authenticateUser);
    const { isLoading: LoginIsLoading, mutate: loginMutate, data: loginData, status: LoginStatus } = useMutation(loginUser);
    const { mutate: checkSessionMutate, data: checkData, status: chechStatus } = useMutation(checkSession);

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
    }, []);

    const memoedValue = useMemo(() => ({
        isLoading,
        signUp,
        authData,
        isUserAutorized: authData?.auth,
        login,
        logout
    }), [signUp, isLoading, authData]);

    console.log('authData ========: ', authData);

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
};