import React, { FC, useEffect, useMemo, useState } from 'react';
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

    const value = useMemo(() => {
        return { isCheckSessionLoading, authData, setAuthData, sessionChecked, setSessionChecked};
    }, [isCheckSessionLoading, authData, setAuthData, sessionChecked, setSessionChecked]);
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};