import { FC, useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../AuthContext';
import { Input } from '../components/Input/Input';
import { InputType } from '../enums';
import Button from '../components/Button/Button';
import { Content, FormWrapper, IconWrapperStyled, InputWrapper } from './Login';
import { Eye } from '@styled-icons/feather/Eye';
import { EyeOff } from '@styled-icons/feather/EyeOff';

interface RegisterForm {
    userName: string;
    email: string;
    password: string;
}

const Register: FC = () => {
    const [loginData, setLoginData] = useState<RegisterForm>({
        userName: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassowrd] = useState<boolean>(false);
    const { signUp } = useContext(AuthContext);

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;

        setLoginData({
            ...loginData,
            [name]: value
        })
    }, [loginData]);

    const handledSetPassword = () => setShowPassowrd(!showPassword);

    const onSubmit = useCallback(() => {
        // dispatch<RegisterUser>(authenticateUser(values.username, values.email, values.password)).then(response => {
        //     setPassword(true);
        //     setSubmitting(false);
        //     if (resError(response?.status)) {
        //         setErrorMessage(response?.errorMessage)
        //     } else {
        //         setErrorMessage('')
        //         history.push('/');
        //     }
        // })

        try {
            signUp(loginData.userName, loginData.email, loginData.password);
        } catch (error) {
            console.log(error);
        }
    }, [loginData]);

    // const handledSetPassword = () => setShowPassowrd(!showPassword);
    
    return (
        <FormWrapper>
            <Content>
                <h2>Rejestrowanie</h2>
                <p>Masz konto?
                    {' '}
                    <Link to='/login'>
                        Zaloguj się
                    </Link>
                </p>
                {/* <p>Uzyj konta Google lub Facebook aby się zalogować</p> */}

                {/* {errorMessage && (<span>{errorMessage}</span>)} */}

                <form onSubmit={onSubmit}>
                    <Input
                        name='userName'
                        colorType={InputType.primary}
                        placeholder={'User name'}
                        value={loginData.userName}
                        autoFocus
                        onChange={handleChange} />
                    <Input
                        name='email'
                        colorType={InputType.primary}
                        placeholder={'Email'}
                        value={loginData.email}
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
                            <IconWrapperStyled color={'grey'}><Eye onClick={handledSetPassword} /></IconWrapperStyled>
                        ) : (
                            <IconWrapperStyled color={'grey'}><EyeOff onClick={handledSetPassword} /></IconWrapperStyled>
                        )}
                    </InputWrapper>

                    <Button primary type='submit' margin>
                        Uwrórz konto
                    </Button>
                </form>
            </Content>
        </FormWrapper>
    );
};

export default Register;