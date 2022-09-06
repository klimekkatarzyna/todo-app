import React, { FC, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'react-feather';
import { useModal } from '../../hooks/useModal';
import { Button } from '../Button/Button';

interface IModalComponentProps<T> {
	children?: React.ReactNode;
	title?: string;
	isLoading?: boolean;
	onHandleAction?: () => void;
}

export const ConfirmModal: FC<IModalComponentProps<unknown>> = ({ children, title, onHandleAction, isLoading }) => {
	const { hideModal } = useModal();

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
				hideModal?.();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, []);

	const onHandleActionAndClose = useCallback(() => {
		onHandleAction?.();
		hideModal();
	}, []);

	return createPortal(
		<div
			className={`w-full h-full fixed z-30 p-4 left-0 top-0 right-0 flex items-center justify-center opacity-100 visible transition-all delay-200 ease-out bg-black-rgba`}>
			<div className={`w-[400px] h-auto min-h-[200px] rounded relative bg-white p-4 flex flex-col`}>
				<div className='flex justify-between items-center'>
					<div className='font-semibold text-sm'>{title}</div>
					<button onClick={hideModal}>
						<X className='icon-style' />
					</button>
				</div>
				<div className='text-sm pt-4'>{children}</div>

				<div className='flex justify-end mt-auto'>
					<Button onClick={hideModal} className='button-outline'>
						{'Anuluj'}
					</Button>
					<Button type='button' className='button-secondary' onClick={onHandleActionAndClose} isLoading={isLoading}>
						{'Usuń'}
					</Button>
				</div>
			</div>
		</div>,
		document.body
	);
};
