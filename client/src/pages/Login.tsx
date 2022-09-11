import { FC, useCallback, useContext, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button/Button';
import { useMutation } from 'react-query';
import { InputType } from '../interfaces/app';
import { IUserData, loginValidationSchema } from '@kkrawczyk/todo-common';
import { loginAction } from '../actions/user';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { ROUTE } from '../enums';
import { buildUrl } from '../utils/paths';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { EyeOff, Eye } from 'react-feather';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const Login: FC = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserData>({
		resolver: yupResolver(loginValidationSchema),
	});

	const invitationTokenUrl = sessionStorage.getItem('invitationTokenUrl');
	const { setAuthData } = useContext<AuthContextType>(AuthContext);
	const redirectUrl = useMemo(
		() => (invitationTokenUrl ? `${ROUTE.jointToList}${invitationTokenUrl}` : buildUrl(ROUTE.home)),
		[invitationTokenUrl]
	);
	const { showPassword, handledSetPassword } = useTogglePasswordVisibility();

	const { mutateAsync, isLoading, data } = useMutation(loginAction, {
		onSuccess: response => {
			navigate(redirectUrl);
			setAuthData(response?.data);
		},
		onError: (error: any): any => {
			toast.error(error?.error);
		},
	});

	const onSubmit: SubmitHandler<IUserData> = useCallback(async (data, e) => {
		const { email, password } = data;
		await mutateAsync({ email, password });
		e?.target.reset();
	}, []);

	return (
		<div className='bg-light-grey w-full flex items-center justify-center'>
			<div className='flex items-center flex-col p-8'>
				<h2 className='text-fontColor mt-6 text-center text-3xl font-extrabold mb-2'>Zaloguj się do TODO app</h2>
				<p className='mt-2 text-center text-sm text-gray-600 mb-4'>
					Nie masz masz konta?{' '}
					<Link className='text-blue go-to-register' to={buildUrl(ROUTE.register)}>
						Rejestruj się
					</Link>
				</p>

				{data?.error && <span className='text-red p-2'>{data?.error as string}</span>}

				<form className='w-full mt-2' onSubmit={handleSubmit(onSubmit)}>
					<div className='relative flex flex-col'>
						<label htmlFor='email'>Email</label>
						<input
							autoFocus
							className='input-styles'
							type={InputType.text}
							placeholder={'example.com'}
							{...register('email', { required: true })}
						/>
						{errors.email && <div className='input-error-styles'>{errors.email?.message}</div>}
					</div>

					<div className='relative flex mt-2 flex-col'>
						<label htmlFor='password'>Hasło</label>
						<input
							className='input-styles'
							type={showPassword ? InputType.text : InputType.password}
							placeholder={'Test1111'}
							{...register('password', { required: true })}
						/>
						{errors.password && <div className='input-error-styles'>{errors.password?.message}</div>}
						{!showPassword ? (
							<Eye onClick={handledSetPassword} className='eye-icon' />
						) : (
							<EyeOff onClick={handledSetPassword} className='eye-icon' />
						)}
					</div>

					<Button type='submit' isLoading={isLoading} className='w-full mt-6 button-primary'>
						<span>Zaloguj</span>
					</Button>
				</form>
			</div>
		</div>
	);
};
