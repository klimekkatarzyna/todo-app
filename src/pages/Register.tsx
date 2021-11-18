import { FC, useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Input } from '../components/Input/Input';
import { InputVersion } from '../enums';
import Button from '../components/Button/Button';
import { Content, FormWrapper, InputWrapper } from './Login';
import { removesWhitespaceFromString } from '../utils/utilsFunctions';
import InputEye from '../components/InputEye';

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
    const handledSetPassword = (): void => setShowPassowrd(!showPassword);

    const { signUp } = useContext(AuthContext);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const clearStr = removesWhitespaceFromString(value);

        setLoginData({
            ...loginData,
            [name]: clearStr
        })
    }, [loginData]);

    const onSubmit = useCallback((): void => {
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
            signUp(loginData.userName, loginData.email, loginData.password); // TODO: async ?
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
                        colorType={InputVersion.primary}
                        placeholder={'User name'}
                        value={loginData.userName}
                        autoFocus
                        onChange={handleChange} />
                    <Input
                        name='email'
                        colorType={InputVersion.primary}
                        placeholder={'Email'}
                        value={loginData.email}
                        onChange={handleChange} />

                    <InputWrapper>
                        <Input
                            name='password'
                            colorType={InputVersion.primary}
                            type={!showPassword ? 'password' : 'text'}
                            placeholder={'Password'}
                            value={loginData.password}
                            onChange={handleChange} />
                        <InputEye showPassword={showPassword} handledSetPassword={handledSetPassword} />
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