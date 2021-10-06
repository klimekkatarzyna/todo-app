import * as api from '../services';
import { http } from '../utils/http';

interface IAuthenticateUser {
    username: string;
    email: string;
    password: string;
}

const useAuthorization = () => {

    const authenticateUser = ({ username, email, password }: IAuthenticateUser) => {
        return http(api.register, 'POST', {
            body: JSON.stringify({ username, email, password }),
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => {
            if (response?.auth && !!response?.token?.length) {
                localStorage.setItem('token', JSON.stringify(response?.token));
    
                // dispatch({ 
                //     type: actionTypes.REGISTER_USER_COMPLETED,
                //     authorized: response?.auth,
                //     user: response?.body
                // });
            }
    
            // dispatch(checkSession(localStorage.getItem('token')));
    
            // if (resError(response)) {
            //     dispatch({
            //         errorMessage: response.message
            //     })
            // }
    
            return response;
        }).catch(error => {
            console.error(error);
            return error;
        })
    }

    return {
        authenticateUser
    }
};

export default useAuthorization;