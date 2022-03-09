import { FC, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLOURS } from '../constants';
import { Button } from '../components/Button/Button';
import { InputVersion } from '../enums';
import { Input } from '../components/Input/Input';
import { removesWhitespaceFromString } from '../utils/utilsFunctions';
import { useMutation } from 'react-query';
import { useAuthorization } from '../hooks/useAuthorization';
import { PasswordInput } from '../components/PasswordInput';
import { LoginForm } from '../interfaces/app';

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

export const Login: FC = () => {
	const [loginData, setLoginData] = useState<LoginForm>({
		email: '',
		password: '',
	});

	const { loginRequest } = useAuthorization();
	const { mutateAsync: login, isLoading, error } = useMutation(loginRequest);

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

				{/* {error && (<span>{error}</span>)} */}

				<form onSubmit={onSubmit}>
					<Input
						name='email'
						colorType={InputVersion.primary}
						placeholder={'Email'}
						value={loginData.email}
						autoFocus
						onChange={handleChange}
					/>

					<PasswordInput loginData={loginData} handleChange={handleChange} />

					<Button primary type='submit' margin isLoading={isLoading}>
						<span>Zaloguj</span>
					</Button>
				</form>
			</Content>
		</FormWrapper>
	);
};
