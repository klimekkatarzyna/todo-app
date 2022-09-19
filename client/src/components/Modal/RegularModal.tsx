import React, { FC, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'react-feather';
import { useModal } from '../../hooks/useModal';

interface IModalComponentProps {
	children?: React.ReactNode;
	title?: string;
	onHandleAction?: () => void;
}

export const RegularModal: FC<IModalComponentProps> = ({ children, title, onHandleAction }) => {
	const { hideModal } = useModal();

	const onHandleActionAndClose = useCallback(() => {
		onHandleAction?.();
		hideModal();
	}, [hideModal, onHandleAction]);

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.code === 'Escape') {
				onHandleActionAndClose();
			}
		};
		document.addEventListener('keydown', listener);
		return () => {
			document.removeEventListener('keydown', listener);
		};
	}, [onHandleActionAndClose]);

	return createPortal(
		<div
			className={`w-full h-full fixed z-30 p-4 left-0 top-0 right-0 flex items-center justify-center opacity-100 visible transition-all delay-200 ease-out bg-black-rgba`}>
			<div className={`w-[400px] h-auto min-h-[200px] rounded relative bg-white p-4 flex flex-col modal`}>
				<div className='flex justify-between items-center'>
					<h2 className='text-center text-lg m-auto'>
						<strong>{title}</strong>
					</h2>
					<button onClick={hideModal}>
						<X className='icon-style' />
					</button>
				</div>
				<div className='text-sm pt-4'>{children}</div>
			</div>
		</div>,
		document.body
	);
};
