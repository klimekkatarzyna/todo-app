import { FC, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { InputType } from '../interfaces/app';
import { ErrorMessageComponent } from '../formik/ErrorMessageComponent';
import { Input } from '../formik/Input';
import { Formik, Form } from 'formik';
import { useMutation } from 'react-query';
import { RegisterValidationType, registerValidationSchema } from '@kkrawczyk/todo-common';
import { registerAction } from '../actions/user';
import { ROUTE } from '../enums';
import { buildUrl } from '../utils/paths';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { EyeOff, Eye } from 'react-feather';
import toast from 'react-hot-toast';

export const Register: FC = () => {
	const navigate = useNavigate();
	const initialValues = { username: '', email: '', password: '' };
	const { showPassword, handledSetPassword } = useTogglePasswordVisibility();

	const { mutateAsync, isLoading, data } = useMutation(registerAction, {
		onSuccess: () => {
			navigate(buildUrl(ROUTE.home));
		},
		onError: (error: any): any => {
			toast.error(error?.error);
		},
	});

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
							<div className='relative flex flex-col'>
								<Input name='username' placeholder={'User name'} {...props} />
								{errors.username && touched.username && <ErrorMessageComponent name='username' />}
							</div>
							<div className='relative flex flex-col mt-2'>
								<Input name='email' placeholder={'Email'} {...props} />
								{errors.email && touched.email && <ErrorMessageComponent name='email' />}
							</div>
							<div className='relative flex flex-col mt-2'>
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
							<Button type='submit' isLoading={isLoading} className='w-full button-primary mt-6'>
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
