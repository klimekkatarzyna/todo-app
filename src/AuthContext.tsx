import { createContext } from 'react';
import { IUserData } from './interfaces/app';
import { HttpResponse } from './utils/http';

export interface AuthContextType {
    signUp: (username: string, email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logout: (token: string) => void;
    checkSession: (token: string) => Promise<unknown>;
    authData: HttpResponse<IUserData> | undefined;
    LoginIsLoading: boolean;
    setAuthData: React.Dispatch<React.SetStateAction<HttpResponse<IUserData>>>;
    loginoutData: HttpResponse<IUserData>;
}

// better do it in separate file because the values return by the context will be use in few files
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);