import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { COLOURS } from '../../constants';
import { Loader } from '../Loader/Loader';

interface IButtonProps {
	primary?: boolean;
	secondary?: boolean;
	outline?: boolean;
	disabled?: boolean;
	margin?: boolean;
}

const ButtonStyled = styled.button<IButtonProps>`
	padding: 0.5rem;
	border-radius: 0.3rem;
	border: none;
	cursor: pointer;
	color: ${COLOURS.fontColor};
	margin-top: ${props => props.primary && '1rem'};
	margin-left: 0.5rem;
	display: flex;
	flex-direction: row;
	align-items: center;

	${props =>
		props.primary &&
		css`
			background-color: ${COLOURS.blue};
			color: ${COLOURS.white};
		`};

	${props =>
		props.secondary &&
		css`
			background-color: ${COLOURS.red};
			color: ${COLOURS.white};
		`};

	${props =>
		props.outline &&
		css`
			background: none;
			border: 1px solid;
			color: ${COLOURS.white};
		`};

	${props =>
		props.disabled &&
		css`
			&:disabled {
				background-color: ${COLOURS.lightBlue};
				cursor: not-allowed;
			}
		`};

	> div {
		margin: 0 0.4rem;
		span {
			border: 0.3rem solid #eaeaea;
			border-radius: 50%;
			width: 0.4rem;
			height: 0.4rem;
			border-top: 0.3 solid #b5b5b5;
		}
	}
`;

type ButtonType = 'button' | 'submit' | 'reset';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	type?: ButtonType;
	primary?: boolean;
	secondary?: boolean;
	outline?: boolean;
	disabled?: boolean;
	margin?: boolean;
	onClick?: (e: React.MouseEvent) => void;
	isLoading?: boolean;
}

export const Button: FC<IButton> = ({ primary, children, type = 'submit', secondary, outline, disabled, margin, onClick, isLoading, ...props }) => {
	return (
		<>
			<ButtonStyled
				{...props}
				primary={primary}
				secondary={secondary}
				outline={outline}
				type={type}
				disabled={disabled}
				margin={margin}
				onClick={onClick}>
				{children}
				{isLoading && <Loader />}
			</ButtonStyled>
		</>
	);
};
