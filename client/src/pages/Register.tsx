import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { Content, FormWrapper } from './Login';
import { InputType } from '../interfaces/app';
import { ErrorMessageComponent } from '../formik/ErrorMessageComponent';
import { Input } from '../formik/Input';
import { Formik, Form } from 'formik';
import { useAuthorization } from '../hooks/useAuthorization';
import { useMutation } from 'react-query';
import { RegisterValidationType, registerValidationSchema } from '@kkrawczyk/todo-common';

export const Register: FC = () => {
	const initialValues = { username: '', email: '', password: '' };
	const { authenticateUserRequest } = useAuthorization();
	const { mutateAsync, isLoading, error } = useMutation(authenticateUserRequest);

	const onSubmit = useCallback(async (values: RegisterValidationType, { resetForm }) => {
		await mutateAsync({ username: values.username, email: values.email, password: values.password });
		resetForm();
	}, []);

	return (
		<FormWrapper>
			<Content>
				<h2>Rejestrowanie</h2>
				<p>
					Masz konto? <Link to='/login'>Zaloguj się</Link>
				</p>

				{error && <span>{error as string}</span>}

				<Formik initialValues={initialValues as RegisterValidationType} validationSchema={registerValidationSchema} onSubmit={onSubmit}>
					{({ errors, touched, ...props }) => (
						<Form>
							<div className='relative'>
								<Input name='username' placeholder={'User name'} {...props} />
								{errors.username && touched.username ? <ErrorMessageComponent name='username' /> : null}
							</div>
							<div className='relative'>
								<Input name='email' placeholder={'Email'} {...props} />
								{errors.email && touched.email ? <ErrorMessageComponent name='email' /> : null}
							</div>
							<div className='relative'>
								<Input name='password' type={InputType.password} placeholder={'Password'} {...props} />
								{errors.password && touched.password ? <ErrorMessageComponent name='password' /> : null}
							</div>
							<Button primary type='submit' margin isLoading={isLoading}>
								Uwrórz konto
							</Button>
						</Form>
					)}
				</Formik>
			</Content>
		</FormWrapper>
	);
};

export default Register;
