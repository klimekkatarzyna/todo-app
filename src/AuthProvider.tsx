import React, { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from './AuthContext';
import useAuthorization from './hooks/useAuthorization';
import { IUserData } from './interfaces/app';

interface IAuthProvider {
    children: React.ReactNode;
}

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
    const [authData, setAuthData] = useState<IUserData | undefined>(undefined);
    const [sessionChecked, setSessionChecked] = useState<boolean>(false);

    const { checkSession } = useAuthorization();
    const { isLoading: isCheckSessionLoading } = useQuery('checkSession', checkSession);

    useEffect(() => {
        (async () => {
            const response = await checkSession();
            setAuthData(response?.body?.user);
            setSessionChecked(true);
        })();
    }, []);
    
    return (
        <AuthContext.Provider value={{ isCheckSessionLoading, authData, setAuthData, sessionChecked, setSessionChecked}}>
            {children}
        </AuthContext.Provider>
    );
};