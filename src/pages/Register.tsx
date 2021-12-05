import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/Input/Input';
import { InputVersion } from '../enums';
import { Button } from '../components/Button/Button';
import { Content, FormWrapper, InputWrapper } from './Login';
import { removesWhitespaceFromString } from '../utils/utilsFunctions';
import { InputEye } from '../components/InputEye';
import { useAuthorization } from '../hooks/useAuthorization';
import { useMutation } from 'react-query';

interface RegisterForm {
	userName: string;
	email: string;
	password: string;
}

export const Register: FC = () => {
	const [loginData, setLoginData] = useState<RegisterForm>({
		userName: '',
		email: '',
		password: '',
	});
	const [showPassword, setShowPassowrd] = useState<boolean>(false);
	const handledSetPassword = (): void => setShowPassowrd(!showPassword);

	const { authenticateUserRequest } = useAuthorization();
	const { mutateAsync: authenticateUser, isLoading } = useMutation(authenticateUserRequest);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = event.target;
			const clearStr = removesWhitespaceFromString(value);

			setLoginData({
				...loginData,
				[name]: clearStr,
			});
		},
		[loginData]
	);

	const onSubmit = useCallback(async (): Promise<void> => {
		await authenticateUser({
			username: loginData.userName,
			email: loginData.email,
			password: loginData.password,
		});
	}, [loginData]);

	return (
		<FormWrapper>
			<Content>
				<h2>Rejestrowanie</h2>
				<p>
					Masz konto? <Link to='/login'>Zaloguj się</Link>
				</p>
				{/* <p>Uzyj konta Google lub Facebook aby się zalogować</p> */}

				{/* {errorMessage && (<span>{errorMessage}</span>)} */}

				<form onSubmit={onSubmit}>
					<Input
						name='userName'
						colorType={InputVersion.primary}
						placeholder={'User name'}
						value={loginData.userName}
						autoFocus
						onChange={handleChange}
					/>
					<Input
						name='email'
						colorType={InputVersion.primary}
						placeholder={'Email'}
						value={loginData.email}
						onChange={handleChange}
					/>

					<InputWrapper>
						<Input
							name='password'
							colorType={InputVersion.primary}
							type={!showPassword ? 'password' : 'text'}
							placeholder={'Password'}
							value={loginData.password}
							onChange={handleChange}
						/>
						<InputEye showPassword={showPassword} handledSetPassword={handledSetPassword} />
					</InputWrapper>

					<Button primary type='submit' margin isLoading={isLoading}>
						Uwrórz konto
					</Button>
				</form>
			</Content>
		</FormWrapper>
	);
};

export default Register;
