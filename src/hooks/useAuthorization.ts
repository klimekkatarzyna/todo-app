import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IUserData } from '../interfaces';
import * as api from '../services';
import { http, HttpResponse } from '../utils/http';

interface IAuthenticateUser {
    username: string;
    email: string;
    password: string;
}

interface ILoginUser {
    email: string;
    password: string;
}

const useAuthorization = () => {
    const history = useHistory();
    const [authData, setAuthData] = useState<HttpResponse<IUserData>>({} as HttpResponse<IUserData>);

    const checkSession = (token: string): Promise<any> => {
        const tokenValue = JSON.parse(token as string);
        return http(api.me, 'GET', {
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${tokenValue}`
            }
        }).then((response) => {
            if (!response?.auth) return;
            localStorage.setItem('token', JSON.stringify(response?.token));
            response?.auth ? history.push('/') : history.push('/login');

            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }

    const authenticateUserRequest = ({ username, email, password }: IAuthenticateUser) => {
        return http(api.register, 'POST', {
            body: JSON.stringify({ username, email, password }),
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => {
            if (!response?.auth) return;
            localStorage.setItem('token', JSON.stringify(response?.token));
            response?.auth && history.push('/');

            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }

    const loginRequest = ({ email, password }: ILoginUser) => {
        return http(api.login, 'POST', {
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => {
            if (!response?.auth) return;
            localStorage.setItem('token', JSON.stringify(response?.token));
            response?.auth && history.push('/');

            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }

    // const loginRequest = async ({ email, password }: ILoginUser) => {
    //     try {
    //         const response = await http(api.login, 'POST', {
    //             body: JSON.stringify({ email, password }),
    //             headers: {
    //                 'Content-type': 'application/json',
    //             }
    //         });
    //         console.log(response);
    //         if (response?.isSuccess && response?.auth) {
    //             setAuthData(response);
    //             localStorage.setItem('token', JSON.stringify(response?.token));
    
    //             return response;
    //         } 
    //     } catch (error) {
    //         throw new Error
    //     }
    // }

    const logoutRequest = (): Promise<any> => {
        const token = localStorage.getItem('token');
        const tokenValue = JSON.parse(token as string);
        
        return http(api.logout, 'POST', {
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${tokenValue}`
            }
        }).then((response) => {
            localStorage.removeItem('token');
            history.push('/login');

            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }

    return {
        authenticateUserRequest,
        checkSession,
        loginRequest,
        logoutRequest,
        setAuthData,
        authData
    }
};

export default useAuthorization;