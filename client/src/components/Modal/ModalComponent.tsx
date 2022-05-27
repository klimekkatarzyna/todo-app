import React, { FC, useCallback, useEffect } from 'react';
import { Button } from '../Button/Button';
import { X } from 'react-feather';

interface IModalComponentProps<T> {
	children?: React.ReactNode;
	title: string;
	onHide: () => void;
	onHandleAction: () => void;
	isActionButtonHidden?: boolean;
	isLoading?: boolean;
}

export const ModalComponent: FC<IModalComponentProps<unknown>> = ({
	children,
	title,
	onHide,
	onHandleAction,
	isActionButtonHidden = false,
	isLoading,
}) => {
	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.code === 'Enter') {
				onHandleActionAndClose();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, []);

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				onHide();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, []);

	const onHandleActionAndClose = useCallback(() => {
		onHandleAction();
		onHide();
	}, []);

	return (
		<div
			className={`w-full h-full fixed z-30 p-4 left-0 top-0 right-0 flex items-center justify-center opacity-100 visible transition-all delay-200 ease-out bg-black-rgba`}>
			<div className={`w-80 h-auto rounded relative bg-white p-4`}>
				<div className='flex justify-between items-center'>
					<div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-lightRed sm:mx-0 sm:h-10 sm:w-10'>
						<svg
							className='h-6 w-6 text-red'
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke-width='2'
							stroke='currentColor'
							aria-hidden='true'>
							<path
								stroke-linecap='round'
								stroke-linejoin='round'
								d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
							/>
						</svg>
					</div>
					<div className='font-semibold text-sm'>{title}</div>
					<button onClick={onHide}>
						<X className='icon-style' />
					</button>
				</div>
				<div className='text-sm pt-4'>{children}</div>
				{!isActionButtonHidden && (
					<div className='flex mt-4 justify-end'>
						<Button onClick={onHide} outline>
							{'Anuluj'}
						</Button>
						<Button type='button' secondary onClick={onHandleActionAndClose} isLoading={isLoading}>
							{'Usuń'}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};
