import { FC, useCallback, useContext, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
import { EyeComponent } from '../components/EyeComponent/EyeComponent';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';

export const Login: FC = () => {
	const history = useHistory();
	const invitationTokenUrl = sessionStorage.getItem('invitationTokenUrl');
	const { setAuthData } = useContext<AuthContextType>(AuthContext);
	const redirectUrl = useMemo(
		() => (invitationTokenUrl ? `${ROUTE.jointToList}${invitationTokenUrl}` : buildUrl(ROUTE.home)),
		[invitationTokenUrl]
	);
	const { showPassword, handledSetPassword } = useTogglePasswordVisibility();

	const initialValues = { email: '', password: '' };

	const loginRequest = useCallback(
		async ({ email, password }: IUserData) => {
			try {
				const response = await loginAction({ email, password });
				if (response.isSuccess && response?.body?._id) {
					history.push(redirectUrl);
					setAuthData(response?.body);
				}
				return response;
			} catch (error) {
				console.error(error);
			}
		},
		[redirectUrl, history, setAuthData]
	);

	const { mutateAsync, isLoading, data } = useMutation(loginRequest);

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
								<EyeComponent showPassword={showPassword} handledSetPassword={handledSetPassword} />
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
