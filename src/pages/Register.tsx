import { FC, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../AuthProvider';
// import { useMutation } from 'react-query';
// import useAuthorization from '../hooks/useAuthorization';

interface RegisterForm {
    username: string;
    email: string;
    password: string;
}

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Too Short!')
        .required('wymagane'),
    email: Yup.string()
        .required('wymagane'),
    password: Yup.string()
        .required('wymagane')
        .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9\d!@#\$%\^&\*.]+)$/, 'password should contain big letter, digit and special character')
});

const InitialValues = {
    username: '',
    email: '',
    password: ''
};

const Register: FC = () => {
    const { signUp } = useContext(AuthContext);
    // const [showPassword, setShowPassowrd] = useState(false);
    // const [password, setPassword] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');

    // const { authenticateUser } = useAuthorization();
    // const { mutate } = useMutation(authenticateUser)

    const onSubmit = useCallback((values: RegisterForm, { setSubmitting }) => {
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
            signUp(values.username, values.email, values.password);
        } catch (error) {
            console.log(error);
        }

    }, []);

    // const handledSetPassword = () => setShowPassowrd(!showPassword);
    
    return (
        <div>
            <h2>Rejestrowanie do aplikacji TODOJanusz</h2>
            <p>Masz konto?
                {' '}
                <Link to='/login'>
                    Zaloguj się
                </Link>
            </p>
            {/* <p>Uzyj konta Google lub Facebook aby się zalogować</p> */}

            {/* {errorMessage && (<span>{errorMessage}</span>)} */}

            <Formik
                initialValues={InitialValues}
                validationSchema={SignupSchema}
                onSubmit={(values: RegisterForm, { setSubmitting }) => onSubmit(values, { setSubmitting })}
                render={({ isSubmitting, errors, touched }: FormikProps<RegisterForm>) => (
                    <Form>
                        <Field
                            name='username'
                            type='text' 
                            placeholder='User name'
                            // component={FormikInput}
                            required />
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
                            Utwórz konto
                        </button>
                    </Form>
                )}
            />
        </div>
    );
};

export default Register;