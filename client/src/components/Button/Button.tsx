import React, { FC } from 'react';
import { Loader } from 'react-feather';

type ButtonType = 'button' | 'submit' | 'reset';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	type?: ButtonType;
	primary?: boolean;
	secondary?: boolean;
	outline?: boolean;
	disabled?: boolean;
	onClick?: (e: React.MouseEvent) => void;
	isLoading?: boolean;
	outlineWhite?: boolean;
}

export const Button: FC<IButton> = ({
	primary,
	children,
	type = 'submit',
	secondary,
	outline,
	disabled,
	outlineWhite,
	onClick,
	isLoading,
	...props
}) => {
	return (
		<>
			<button
				{...props}
				type={type}
				className={`text-sm p-2 rounded cursor-pointer flex direction-row items-center ${
					disabled && 'disabled:bg-lightBlue cursor-not-allowed'
				} ${outline && 'bg-none text-fontColor border border-grey'} ${outlineWhite && 'bg-none text-white border border-white'} ${
					secondary && 'bg-red text-white ml-2'
				} ${primary && 'bg-blue text-white mt-4'}`}
				onClick={onClick}>
				{children}
				{isLoading && <Loader className='ml-2' />}
			</button>
		</>
	);
};
