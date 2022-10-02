import { FC, useCallback, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button/Button';
import { InputType } from '../interfaces/app';
import { useMutation } from 'react-query';
import { IUserData, registerValidationSchema } from '@kkrawczyk/todo-common';
import { registerAction } from '../api/user';
import { ROUTE } from '../enums';
import { buildUrl } from '../utils/paths';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { EyeOff, Eye } from 'react-feather';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext, AuthContextType } from '../AuthProvider';
import { useTranslation } from 'react-i18next';

export const Register: FC = () => {
	const { t } = useTranslation();
	const { setAuthData } = useContext<AuthContextType>(AuthContext);
	const navigate = useNavigate();
	const { showPassword, handledSetPassword } = useTogglePasswordVisibility();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IUserData>({
		resolver: yupResolver(registerValidationSchema),
	});

	const { mutateAsync, isLoading, data } = useMutation(registerAction, {
		onSuccess: response => {
			navigate(buildUrl(ROUTE.home));
			setAuthData(response?.data);
		},
		onError: (error: any): any => {
			toast.error(error?.error);
		},
	});

	const onSubmit: SubmitHandler<IUserData> = useCallback(
		async (data, e) => {
			const { username, email, password } = data;
			await mutateAsync({ username, email, password });
			e?.target.reset();
		},
		[mutateAsync]
	);

	return (
		<div className='bg-light-grey w-full flex items-center justify-center'>
			<div className='flex items-center flex-col p-8'>
				<h2 className='text-fontColor mt-6 text-center text-3xl font-extrabold mb-2'>{t('register-title')}</h2>
				<p className='mt-2 text-center text-sm text-gray-600 mb-4'>
					{t('have-account')}{' '}
					<Link className='text-blue' to={buildUrl(ROUTE.login)}>
						{t('login')}
					</Link>
				</p>
				{data?.error && <span className='text-red p-2'>{data?.error}</span>}
				<form className='w-full mt-2' onSubmit={handleSubmit(onSubmit)}>
					<div className='relative flex flex-col'>
						<label htmlFor='username'>{t('username')}</label>
						<input
							autoFocus
							className='input-styles'
							type={InputType.text}
							placeholder={t('username')}
							{...register('username', { required: true })}
						/>
						{errors.username && <div className='input-error-styles'>{errors.username?.message}</div>}
					</div>
					<div className='relative flex mt-2 flex-col'>
						<label htmlFor='email'>{t('email')}</label>
						<input className='input-styles' type={InputType.text} placeholder={'Email'} {...register('email', { required: true })} />
						{errors.email && <div className='input-error-styles'>{errors.email?.message}</div>}
					</div>

					<div className='relative flex mt-2 flex-col'>
						<label htmlFor='password'>{t('password')}</label>
						<input
							className='input-styles'
							type={showPassword ? InputType.text : InputType.password}
							{...register('password', { required: true })}
						/>
						{errors.password && <div className='input-error-styles'>{errors.password?.message}</div>}
						{!showPassword ? (
							<Eye onClick={handledSetPassword} className='eye-icon' />
						) : (
							<EyeOff onClick={handledSetPassword} className='eye-icon' />
						)}
					</div>

					<Button type='submit' isLoading={isLoading} className='w-full button-primary mt-6'>
						{t('create-account')}
					</Button>
				</form>
			</div>
		</div>
	);
};
