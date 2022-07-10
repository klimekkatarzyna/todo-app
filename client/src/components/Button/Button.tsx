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
	className?: string;
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
	className,
	...props
}) => {
	return (
		<>
			<button
				{...props}
				type={type}
				className={`${className} text-sm p-2 cursor-pointer direction-row items-center inline-flex justify-center rounded-md shadow-sm px-4 py-2 font-medium focus:outline-none sm:text-sm ${
					disabled && 'disabled:bg-lightBlue cursor-not-allowed'
				} ${outline && 'bg-none text-fontColor border border-grey mt-3 w-full bg-white hover:bg-gray-50 sm:mt-0 '} ${
					outlineWhite && 'bg-none text-white border border-white'
				} ${secondary && 'bg-red text-white ml-2 w-full border border-transparent hover:bg-rose-800'} ${
					primary && 'bg-blue text-white mt-4 w-full border border-transparent hover:bg-blue-900'
				}`}
				onClick={onClick}>
				{children}
				{isLoading && <Loader className='animate-spin ml-2 text-sm' />}
			</button>
		</>
	);
};
