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
import { ROUTE } from '../enums';
import { buildUrl } from '../utils/paths';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { EyeComponent } from '../components/EyeComponent/EyeComponent';

export const Register: FC = () => {
	const history = useHistory();
	const initialValues = { username: '', email: '', password: '' };
	const { showPassword, handledSetPassword } = useTogglePasswordVisibility();

	const authenticateUserRequest = useCallback(async ({ username, email, password }: IUserData): Promise<HttpResponse<IUserData> | undefined> => {
		try {
			const response = await registerAction({ username, email, password });
			if (response?.isSuccess) history.push(buildUrl(ROUTE.home));
			return response;
		} catch (err) {
			console.error(err);
		}
	}, []);

	const { mutateAsync, isLoading, data } = useMutation(authenticateUserRequest);

	const onSubmit = useCallback(async (values: RegisterValidationType, { resetForm }) => {
		const { username, email, password } = values;
		await mutateAsync({ username, email, password });
		resetForm();
	}, []);

	return (
		<div className='bg-light-grey w-full flex items-center justify-center'>
			<div className='flex items-center flex-col p-8'>
				<h2 className='text-fontColor mt-6 text-center text-3xl font-extrabold mb-2'>Utwórz konto w TODO app</h2>
				<p className='mt-2 text-center text-sm text-gray-600 mb-4'>
					Masz konto?{' '}
					<Link className='text-blue' to={buildUrl(ROUTE.login)}>
						Zaloguj się
					</Link>
				</p>

				{data?.error && <span className='text-red p-2'>{data?.error}</span>}

				<Formik initialValues={initialValues as RegisterValidationType} validationSchema={registerValidationSchema} onSubmit={onSubmit}>
					{({ errors, touched, ...props }) => (
						<Form className='w-full mt-2'>
							<div className='relative'>
								<Input name='username' placeholder={'User name'} {...props} />
								{errors.username && touched.username ? <ErrorMessageComponent name='username' /> : null}
							</div>
							<div className='relative flex mt-2'>
								<Input name='email' placeholder={'Email'} {...props} />
								{errors.email && touched.email ? <ErrorMessageComponent name='email' /> : null}
							</div>
							<div className='relative flex flex mt-2'>
								<Input
									name='password'
									type={showPassword ? InputType.text : InputType.password}
									placeholder={'Password'}
									{...props}
								/>
								{errors.password && touched.password ? <ErrorMessageComponent name='password' /> : null}
								<EyeComponent showPassword={showPassword} handledSetPassword={handledSetPassword} />
							</div>
							<Button primary type='submit' isLoading={isLoading} className='w-full'>
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
