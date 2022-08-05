import React, { FC } from 'react';
import { Loader } from 'react-feather';

type ButtonType = 'button' | 'submit' | 'reset';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	type?: ButtonType;
	onClick?: (e: React.MouseEvent) => void;
	isLoading?: boolean;
	className?: string;
	label?: string;
}

export const Button: FC<IButton> = ({ children, type = 'submit', onClick, isLoading, className, label, ...props }) => {
	return (
		<>
			<button
				{...props}
				type={type}
				className={`${className} text-sm p-2 cursor-pointer direction-row items-center inline-flex justify-center rounded-md shadow-sm px-4 py-2 font-medium focus:outline-none sm:text-sm`}
				onClick={onClick}>
				{children}
				{isLoading && <Loader className='animate-spin ml-2 text-sm' />}
			</button>
		</>
	);
};
