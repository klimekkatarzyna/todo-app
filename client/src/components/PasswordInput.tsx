import React, { FC } from 'react';
import styled from 'styled-components';
import { Input } from './Input/Input';
import { InputEye } from '../components/InputEye/InputEye';
import { InputVersion } from '../enums';
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility';
import { InputType, LoginForm } from '../interfaces/app';

export const InputWrapper = styled.div`
	display: flex;
	align-items: center;
	position: relative;
`;

interface IPasswordInputProps {
	loginData: LoginForm;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput: FC<IPasswordInputProps> = ({ loginData, handleChange }) => {
	const { showPassword, handledSetPassword } = useTogglePasswordVisibility();
	return (
		<InputWrapper>
			<Input
				name='password'
				colorType={InputVersion.primary}
				type={!showPassword ? InputType.password : InputType.text}
				placeholder={'Password'}
				value={loginData.password}
				onChange={handleChange}
			/>
			<InputEye showPassword={showPassword} handledSetPassword={handledSetPassword} />
		</InputWrapper>
	);
};
