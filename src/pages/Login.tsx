import { FC, useCallback, useContext } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import styled from 'styled-components';
import { COLOURS } from '../constants';
import Button from '../components/Button/Button';
import { AuthContext } from '../AuthContext';

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

const InitialValues = {
    email: undefined,
    password: undefined
}

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .required('wymagane'),
    password: Yup.string()
        .required('wymagane')
        .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9\d!@#\$%\^&\*.]+)$/, 'password should contain big letter, digit and special character')
});

const Login: FC = () => {
    // const [errorMessage, setErrorMessage] = useState('');
    // const [showPassword, setShowPassowrd] = useState(false);

    const { login } = useContext(AuthContext);
    
    const onSubmit = useCallback(async (values: any, { setSubmitting }) => { //  TODO: type
        // dispatch<LoginUser>(loginUser(values)).then(response => {
        //     if (resError(response?.status)) {
        //         setErrorMessage(response?.errorMessage)
        //     } else {
        //         setErrorMessage('')
        //         history.push('/')
        //     }
        // })
        try {
            await login(values.email, values.password);
        } catch {
            
        }
    }, []);

    // const handledSetPassword = () => setShowPassowrd(!showPassword);

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

            <Formik
                initialValues={InitialValues}
                validationSchema={SignupSchema}
                onSubmit={(values: typeof InitialValues, { setSubmitting }) => onSubmit(values, { setSubmitting })}
                render={({ isSubmitting, errors }: FormikProps<typeof InitialValues>) => (
                    <Form>
                        <Field
                            name='email'
                            type='text' 
                            placeholder='Email'
                            autoFocus={true}
                            // component={FormikInput}
                            required />
                        <div>
                            <Field
                                name='password'
                                // type={!showPassword ? 'password' : 'text'}
                                placeholder='Password'
                                // component={FormikInput}
                                required />
                            {/* {!showPassword ? (
                                <Eye onClick={handledSetPassword} />
                            ) : (
                                <EyeOff onClick={handledSetPassword} />
                            )} */}
                        </div>
                        <Button primary type='submit' margin>
                            Zaloguj
                        </Button>
                    </Form>
                )}
            />
            </Content>
        </LoginWrapper>
    );
}

export default Login;