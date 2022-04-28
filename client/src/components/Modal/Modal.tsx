import React, { FC, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ContextualMenuOpion } from '../../enums';
import { ModalComponent } from './ModalComponent';
import { useRecoilState } from 'recoil';
import { modalVisibilityState } from '../../atoms/modal';

interface IModalNEWProps<T> {
	children?: React.ReactNode;
	title: string;
	contextualType?: ContextualMenuOpion;
	onHandleAction: any;
	isActionButtonHidden?: boolean;
	isLoading?: boolean;
}

export const Modal: FC<IModalNEWProps<unknown>> = ({ children, title, onHandleAction, isActionButtonHidden = false, isLoading }) => {
	const [isVisible, setIsVisible] = useRecoilState(modalVisibilityState);

	const onHide = useCallback(() => {
		setIsVisible(false);
	}, [isVisible]);

	const modal = (
		<ModalComponent
			children={children}
			title={title}
			onHandleAction={onHandleAction}
			isActionButtonHidden={isActionButtonHidden}
			isLoading={isLoading}
			onHide={onHide}
		/>
	);

	return isVisible ? createPortal(modal, document.body) : null;
};
