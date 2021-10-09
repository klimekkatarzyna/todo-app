import React, { createContext, FC, useCallback, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import useAuthorization from './hooks/useAuthorization';
import { IAuthData, IResponseStatus, IUserData } from './interfaces';

interface AuthContextType {
    // We defined the user type in `index.d.ts`, but it's
    // a simple object with email, name and password.
    // user?: User;
    // loading: boolean;
    // error?: any;
    //login: (email: string, password: string) => void;
    signUp: (username: string, email: string, password: string) => void;
    token: string;
    isUserAutorized: boolean;
    setAuthData: React.Dispatch<React.SetStateAction<IAuthData>>;
    login: (email: string, password: string) => void;
    userData: IUserData;
    // logout: () => void;
}
  
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
    const [authData, setAuthData] = useState<IAuthData>({} as IAuthData);

    const { authenticateUser, loginUser, checkSession } = useAuthorization();
    const { isLoading, mutate: signUpMutate, data, error, status } = useMutation(authenticateUser);
    const { isLoading: LoginIsLoading, mutate: loginMutate, data: loginData, status: LoginStatus } = useMutation(loginUser);
    const { mutate: checkSessionMutate } = useMutation(checkSession);

    const signUp = useCallback((username: string, email: string, password: string) => {
        signUpMutate({ username: username, email: email, password: password });

        if (!data?.auth && status !== IResponseStatus.success) return;
        setAuthData(data);

        //checkSessionMutate(localStorage.getItem('token') as string);
        //error TODO: handle error
    }, [data, signUpMutate, status]);

    const login = useCallback((email: string, password: string) => {
        loginMutate({ email: email, password: password });

        if (!loginData?.auth && LoginStatus !== IResponseStatus.success) return;
        setAuthData(loginData);
        //error TODO: handle error
    }, [data, loginMutate, status]);

    const memoedValue = useMemo(() => ({
        isLoading,
        signUp,
        isUserAutorized: authData?.auth,
        userData: authData?.body,
        token: authData?.token,
        setAuthData,
        login
    }), [signUp, isLoading, authData]);


    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
};