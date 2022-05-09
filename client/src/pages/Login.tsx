import { FC, useCallback, useContext } from 'react';
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
import { SideMenu } from '../enums';

export const Login: FC = () => {
	const history = useHistory();
	const invitationTokenUrl = sessionStorage.getItem('invitationTokenUrl');
	const { setAuthData } = useContext<AuthContextType>(AuthContext);

	const initialValues = { email: '', password: '' };

	const loginRequest = useCallback(async ({ email, password }: IUserData) => {
		try {
			const response = await loginAction({ email, password });
			if (response.isSuccess && response?.body?._id) {
				history.push(invitationTokenUrl ? `/jointToList${invitationTokenUrl}` : SideMenu.myDay);
				setAuthData(response?.body);
			}

			return response;
		} catch (error) {
			console.error(error);
		}
	}, []);

	const { mutate, isLoading, data } = useMutation(loginRequest);

	const onSubmit = useCallback(async (values: LoginValidationType, { resetForm }) => {
		await mutate({ email: values.email, password: values.password });
		resetForm();
	}, []);

	return (
		<div className='bg-light-grey w-full flex items-center justify-center'>
			<div className='bg-white flex items-center flex-col p-8 w-80'>
				<h2 className='text-blue text-lg font-semibold mb-2'>Zaloguj się</h2>
				<p>
					Nie masz masz konta?{' '}
					<Link className='text-blue' to='/register'>
						Rejestruj się!
					</Link>
				</p>

				{data?.error && <span className='text-red p-2'>{data?.error as string}</span>}

				<Formik initialValues={initialValues as LoginValidationType} validationSchema={loginValidationSchema} onSubmit={onSubmit}>
					{({ errors, touched, ...props }) => (
						<Form className='w-full mt-2'>
							<div className='relative'>
								<Input name='email' placeholder={'Email'} {...props} />
								{errors.email && touched.email ? <ErrorMessageComponent name='email' /> : null}
							</div>

							<div className='relative'>
								<Input name='password' type={InputType.password} placeholder={'Password'} {...props} />
								{errors.password && touched.password ? <ErrorMessageComponent name='password' /> : null}
							</div>

							<Button primary type='submit' isLoading={isLoading}>
								<span>Zaloguj</span>
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
