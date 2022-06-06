import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { ContextMenuOpion } from '../../enums';
import { ModalComponent } from './ModalComponent';

interface IModalNEWProps<T> {
	children?: React.ReactNode;
	title: string;
	contextualType?: ContextMenuOpion;
	onHandleAction: any;
	onHide: () => void;
	isActionButtonHidden?: boolean;
	isLoading?: boolean;
}

export const Modal: FC<IModalNEWProps<unknown>> = ({ children, title, onHandleAction, isActionButtonHidden = false, isLoading, onHide }) => {
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

	return createPortal(modal, document.body);
};
