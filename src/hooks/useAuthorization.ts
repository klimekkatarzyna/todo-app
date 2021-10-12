import { useState } from 'react';
import { useMutation } from 'react-query';
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

    const checkSession = (token: string) => {
        const tokenValue = JSON.parse(token);
        return http(api.me, 'GET', {
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${tokenValue}`
            }
        }).then((response) => {
            localStorage.setItem('token', JSON.stringify(response?.token));

            setAuthData(response);
            response?.auth ? history.push('/my_day') : history.push('/login');

            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }

    const { mutate: checkSessionMutate } = useMutation(checkSession);

    const authenticateUser = ({ username, email, password }: IAuthenticateUser) => {
        return http(api.register, 'POST', {
            body: JSON.stringify({ username, email, password }),
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => {
            if (!response?.auth) return;
            setAuthData(response);
            localStorage.setItem('token', JSON.stringify(response?.token));
            response?.auth && history.push('/my_day');

            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }

    const loginUser = ({ email, password }: ILoginUser) => {
        return http(api.login, 'POST', {
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': 'application/json',
            }
        }).then((response) => {
            if (!response?.auth) return;
            setAuthData(response);
            localStorage.setItem('token', JSON.stringify(response?.token));
            response?.auth && checkSessionMutate(localStorage.getItem('token') as string);

            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }

    const logoutUser = (token: string) => {
        const tokenValue = JSON.parse(token);
        
        return http(api.logout, 'POST', {
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${tokenValue}`
            }
        }).then((response) => {
            localStorage.removeItem('token');
            setAuthData({} as HttpResponse<IUserData>);
            history.push('/login');

            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }

    return {
        authenticateUser,
        checkSession,
        loginUser,
        logoutUser,
        setAuthData,
        authData
    }
};

export default useAuthorization;