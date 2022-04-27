import React, { FC, useCallback, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ContextualMenuContext } from '../../ContextualMenuProvider';
import { ContextualMenuOpion } from '../../enums';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { Button } from '../Button/Button';
import { X } from 'react-feather';

interface IModalNEWProps<T> {
	children?: React.ReactNode;
	title: string;
	contextualType: ContextualMenuOpion;
	onHandleAction: any;
	isActionButtonHidden?: boolean;
	isLoading?: boolean;
}

export const Modal: FC<IModalNEWProps<unknown>> = ({ children, title, contextualType, onHandleAction, isActionButtonHidden = false, isLoading }) => {
	const { contextualMenu } = useContext(ContextualMenuContext);
	const { onHide, isVisible } = useContext(ModalVisibilityContext);

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
	}, [contextualMenu]);

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

	const modal = (
		<div
			className={`w-full h-full fixed p-4 left-0 top-0 right-0 flex items-center justify-center opacity-100 visible transition-all delay-200 ease-out bg-black-rgba`}>
			<div className={`w-80 h-auto rounded relative bg-white p-4`}>
				<div className='flex justify-between'>
					<div className='font-semibold text-sm'>{title}</div>
					<button onClick={onHide}>
						<X className='icon-style' />
					</button>
				</div>
				<div className='text-sm pt-4'>{children}</div>
				{!isActionButtonHidden && (
					<div className='flex mt-4'>
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

	return isVisible && contextualType === contextualMenu?.type ? createPortal(modal, document.body) : null;
};
