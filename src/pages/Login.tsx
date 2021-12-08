import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOURS } from '../constants';
import { Button } from '../components/Button/Button';
import { InputVersion } from '../enums';
import { Input } from '../components/Input/Input';
import { removesWhitespaceFromString } from '../utils/utilsFunctions';
import { InputEye } from '../components/InputEye/InputEye';
import { useMutation } from 'react-query';
import { useAuthorization } from '../hooks/useAuthorization';

export const FormWrapper = styled.div`
	background-color: ${COLOURS.lightGrey};
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	form {
		width: 100%;
	}
`;

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: ${COLOURS.white};
	padding: 2rem;
	min-width: 300px;

	h2,
	a {
		color: ${COLOURS.blue};
	}
`;

export const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	position: relative;
`;

interface LoginForm {
	email: string;
	password: string;
}

export const Login: FC = () => {
	const [loginData, setLoginData] = useState<LoginForm>({
		email: '',
		password: '',
	});

	const [showPassword, setShowPassowrd] = useState<boolean>(false);
	const handledSetPassword = (): void => setShowPassowrd(!showPassword);

	const { loginRequest } = useAuthorization();
	const { mutateAsync: login, isLoading } = useMutation(loginRequest);

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>): void => {
			const { name, value } = event.target;
			const clearStr = removesWhitespaceFromString(value);

			setLoginData({
				...loginData,
				[name]: clearStr,
			});
		},
		[loginData]
	);

	const onSubmit = useCallback(
		async (event: React.SyntheticEvent): Promise<void> => {
			event.preventDefault();
			await login({ email: loginData.email, password: loginData.password });
		},
		[loginData]
	);

	return (
		<FormWrapper>
			<Content>
				<h2>Zaloguj się</h2>
				<p>
					Nie masz masz konta? <Link to='/register'>Rejestruj się!</Link>
				</p>
				{/* <p>Uzyj konta Google lub Facebook aby się zalogować</p> */}

				{/* {errorMessage && (<span>{errorMessage}</span>)} */}

				<form onSubmit={onSubmit}>
					<Input
						name='email'
						colorType={InputVersion.primary}
						placeholder={'Email'}
						value={loginData.email}
						autoFocus
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
						<span>Zaloguj</span>
					</Button>
				</form>
			</Content>
		</FormWrapper>
	);
};
