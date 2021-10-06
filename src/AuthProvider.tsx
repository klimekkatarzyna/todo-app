import React, { createContext, FC, useCallback, useContext, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import useAuthorization from './hooks/useAuthorization';
import { IAuthData } from './interfaces';

interface AuthContextType {
    // We defined the user type in `index.d.ts`, but it's
    // a simple object with email, name and password.
    // user?: User;
    // loading: boolean;
    // error?: any;
    // login: (email: string, password: string) => void;
    signUp: (username: string, email: string, password: string) => void;
    // logout: () => void;
}
  
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);
//export const AuthContext = createContext('Default Value');

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
    const [authData, setAuthData] = useState<IAuthData>({} as IAuthData);

    const { authenticateUser } = useAuthorization();
    const { isLoading, mutate, data, error, status } = useMutation(authenticateUser);

    const signUp = useCallback((username: string, email: string, password: string) => {
        try {
            mutate({ username: username, email: email, password: password });

            if (!data.auth && status !== 'success') return;
            setAuthData(data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const memoedValue = useMemo(
        () => ({
            isLoading,
            signUp,
            isUserAutorized: authData.auth
        }),
        []
    );

    console.log(isLoading, data, error, status);

    return (
        <AuthContext.Provider value={memoedValue}>
            {children}
        </AuthContext.Provider>
    );
};