import { FC, useCallback, useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { useMutation } from 'react-query';
import { InputType } from '../interfaces/app';
import { ErrorMessageComponent } from '../formik/ErrorMessageComponent';
import { Input } from '../formik/Input';
import { Formik, Form } from 'formik';
import { loginValidationSchema, LoginValidationType, IUserData } from '@kkrawczyk/todo-common';
import { loginAction } from '../actions/user';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { ROUTE } from '../enums';
import { buildUrl } from '../utils/paths';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { EyeOff, Eye } from 'react-feather';

export const Login: FC = () => {
	const naviate = useNavigate();
	const invitationTokenUrl = sessionStorage.getItem('invitationTokenUrl');
	const { setAuthData } = useContext<AuthContextType>(AuthContext);
	const redirectUrl = useMemo(
		() => (invitationTokenUrl ? `${ROUTE.jointToList}${invitationTokenUrl}` : buildUrl(ROUTE.home)),
		[invitationTokenUrl]
	);
	const { showPassword, handledSetPassword } = useTogglePasswordVisibility();

	const initialValues = { email: '', password: '' };

	const { mutateAsync, isLoading, data } = useMutation(loginAction, {
		onSuccess: response => {
			naviate(redirectUrl);
			setAuthData(response?.body);
		},
	});

	const onSubmit = useCallback(async (values: LoginValidationType, { resetForm }) => {
		const { email, password } = values;
		await mutateAsync({ email, password });
		resetForm();
	}, []);

	return (
		<div className='bg-light-grey w-full flex items-center justify-center'>
			<div className='flex items-center flex-col p-8'>
				<h2 className='text-fontColor mt-6 text-center text-3xl font-extrabold mb-2'>Zaloguj się do TODO app</h2>
				<p className='mt-2 text-center text-sm text-gray-600 mb-4'>
					Nie masz masz konta?{' '}
					<Link className='text-blue' to={buildUrl(ROUTE.register)}>
						Rejestruj się
					</Link>
				</p>

				{data?.error && <span className='text-red p-2'>{data?.error as string}</span>}

				<Formik initialValues={initialValues as LoginValidationType} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
					{({ errors, touched, ...props }) => (
						<Form className='w-full mt-2'>
							<div className='relative'>
								<Input name='email' placeholder={'Email'} {...props} />
								{errors.email && touched.email && <ErrorMessageComponent name='email' />}
							</div>

							<div className='relative flex mt-2'>
								<Input
									name='password'
									type={showPassword ? InputType.text : InputType.password}
									placeholder={'Password'}
									{...props}
								/>
								{errors.password && touched.password && <ErrorMessageComponent name='password' />}
								{!showPassword ? (
									<Eye onClick={handledSetPassword} className='icon-style text-fontColor absolute right-5 top-2' />
								) : (
									<EyeOff onClick={handledSetPassword} className='icon-style text-fontColor absolute right-5 top-2' />
								)}
							</div>

							<Button primary type='submit' isLoading={isLoading} className='w-full'>
								<span>Zaloguj</span>
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
