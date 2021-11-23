import { createContext } from 'react';
import { IUserData } from './interfaces/app';

export interface AuthContextType {
    isCheckSessionLoading: boolean;
    authData: IUserData | undefined;
    setAuthData: any; // TODO: add types
    sessionChecked: boolean;
    setSessionChecked: any; // TODO: add types
    // loginoutData: HttpResponse<IUserData>;
}

// better do it in separate file because the values return by the context will be use in few files
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);