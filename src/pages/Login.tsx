import { FC, useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from '../constants';
import Button from '../components/Button/Button';
import { AuthContext } from '../AuthContext';
import { InputType } from '../enums';
import { Input } from '../components/Input/Input';
import { Eye } from '@styled-icons/feather/Eye';
import { EyeOff } from '@styled-icons/feather/EyeOff';

const LoginWrapper = styled.div`
    background-color: ${COLOURS.lightGrey};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${COLOURS.white};
    padding: 2rem;

    h2, a {
        color: ${COLOURS.blue};
    }
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Login: FC = () => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassowrd] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    const { login } = useContext(AuthContext);

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;

        console.log(name, value);

        setLoginData({
            ...loginData,
            [name]: value
        })
    }, []);

    const handledSetPassword = () => setShowPassowrd(!showPassword);
    
    const onSubmit = useCallback(async (event) => { //  TODO: type
        event.preventDefault();
        // dispatch<LoginUser>(loginUser(values)).then(response => {
        //     if (resError(response?.status)) {
        //         setErrorMessage(response?.errorMessage)
        //     } else {
        //         setErrorMessage('')
        //         history.push('/')
        //     }
        // })
        try {
            await login(loginData.email, loginData.password);
        } catch {
            
        }
    }, [loginData]);

    return (
        <LoginWrapper>
            <Content>
            <h2>Zaloguj się</h2>
            <p>Nie masz masz konta?
                {' '}
                <Link to='/register'>
                    Rejestruj się!
                </Link>
            </p>
            {/* <p>Uzyj konta Google lub Facebook aby się zalogować</p> */}

            {/* {errorMessage && (<span>{errorMessage}</span>)} */}

            <form onSubmit={onSubmit}>
                <Input
                    name='email'
                    colorType={InputType.primary}
                    placeholder={'Email'}
                    value={loginData.email}
                    autoFocus
                    onChange={handleChange} />

                <InputWrapper>
                    <Input
                        name='password'
                        colorType={InputType.primary}
                        type={!showPassword ? 'password' : 'text'}
                        placeholder={'Password'}
                        value={loginData.password}
                        onChange={handleChange} />
                    {!showPassword ? (
                        <IconWrapper color={'grey'}><Eye onClick={handledSetPassword} /></IconWrapper>
                    ) : (
                        <IconWrapper color={'grey'}><EyeOff onClick={handledSetPassword} /></IconWrapper>
                    )}
                </InputWrapper>

                <Button primary type='submit' margin>
                    Zaloguj
                </Button>
            </form>
            </Content>
        </LoginWrapper>
    );
}

export default Login;