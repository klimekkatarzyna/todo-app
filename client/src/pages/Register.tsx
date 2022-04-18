import { FC, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { InputType } from '../interfaces/app';
import { ErrorMessageComponent } from '../formik/ErrorMessageComponent';
import { Input } from '../formik/Input';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-query';
import { RegisterValidationType, registerValidationSchema, IUserData } from '@kkrawczyk/todo-common';
import { registerAction } from '../actions/user';
import { HttpResponse } from '../utils/http';

export const Register: FC = () => {
	const history = useHistory();
	const initialValues = { username: '', email: '', password: '' };

	const authenticateUserRequest = useCallback(async ({ username, email, password }: IUserData): Promise<HttpResponse<IUserData> | undefined> => {
		try {
			const response = await registerAction({ username, email, password });
			if (response?.isSuccess) history.push('/');
			return response;
		} catch (err) {
			console.error(err);
		}
	}, []);

	const { mutate, isLoading, data } = useMutation(authenticateUserRequest);

	const onSubmit = useCallback(async (values: RegisterValidationType, { resetForm }) => {
		await mutate({ username: values.username, email: values.email, password: values.password });
		resetForm();
	}, []);

	return (
		<div className='bg-light-grey w-full flex items-center justify-center'>
			<div className='bg-white flex items-center flex-col p-8 w-80'>
				<h2 className='text-blue text-lg font-semibold mb-2'>Rejestrowanie</h2>
				<p>
					Masz konto?{' '}
					<Link className='text-blue' to='/login'>
						Zaloguj się
					</Link>
				</p>

				{data?.error && <span className='text-red p-2'>{data?.error}</span>}

				<Formik initialValues={initialValues as RegisterValidationType} validationSchema={registerValidationSchema} onSubmit={onSubmit}>
					{({ errors, touched, ...props }) => (
						<Form className='w-full mt-2'>
							<div className='relative'>
								<Input name='username' placeholder={'User name'} {...props} autoFocus />
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
							<Button primary type='submit' isLoading={isLoading}>
								Uwrórz konto
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Register;
