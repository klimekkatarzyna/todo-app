import React, { FC, useCallback } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

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
    // const dispatch = useDispatch();
    
    const onSubmit = useCallback((values: any, { setSubmitting }) => { //  TODO: type
        // dispatch<LoginUser>(loginUser(values)).then(response => {
        //     if (resError(response?.status)) {
        //         setErrorMessage(response?.errorMessage)
        //     } else {
        //         setErrorMessage('')
        //         history.push('/')
        //     }
        // })
    }, []);

    // const handledSetPassword = () => setShowPassowrd(!showPassword);

    return (
        <div>
            <h2>Logowanie do aplikacji TODOJanusz</h2>
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
                        <button type='submit'>
                            Zaloguj
                        </button>
                    </Form>
                )}
            />
        </div>
    );
}

export default Login;