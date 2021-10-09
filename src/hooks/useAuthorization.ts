import { useMutation } from 'react-query';
import { useHistory } from 'react-router';
import { IResponseStatus } from '../interfaces';
import * as api from '../services';
import { http } from '../utils/http';

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

    const checkSession = (token: string) => {
        const tokenValue = JSON.parse(token);
        return http(api.me, 'GET', {
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${tokenValue}`
            }
        }).then((response) => {
            response?.auth ? history.push('/my_day') : history.push('/login');
            response.status === 500 && history.push('/login');
            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }

    const { mutate } = useMutation(checkSession);

    const authenticateUser = ({ username, email, password }: IAuthenticateUser) => {
        return http(api.register, 'POST', {
            body: JSON.stringify({ username, email, password }),
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => {
            if (!response?.auth) return;
            localStorage.setItem('token', JSON.stringify(response?.token));
            //mutate(localStorage.getItem('token') as string);
    
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
                'Content-type': 'application/json'
            }
        }).then((response) => {
            if (!response?.auth) return;
            localStorage.setItem('token', JSON.stringify(response?.token));
            response?.auth && mutate(localStorage.getItem('token') as string);
            response?.auth ? history.push('/') : history.push('/login');

            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }

    return {
        authenticateUser,
        checkSession,
        loginUser
    }
};

export default useAuthorization;