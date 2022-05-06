import React, { FC, useContext } from 'react';
import { createPortal } from 'react-dom';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { ContextMenuOpion } from '../../enums';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { ModalComponent } from './ModalComponent';

interface IContextualModalProps<T> {
	children?: React.ReactNode;
	title: string;
	contextualType?: ContextMenuOpion;
	onHandleAction: any;
	isActionButtonHidden?: boolean;
	isLoading?: boolean;
}

export const ContextualModal: FC<IContextualModalProps<unknown>> = ({
	children,
	title,
	contextualType,
	onHandleAction,
	isActionButtonHidden = false,
	isLoading,
}) => {
	const { contextualMenu } = useContext(ContextMenuContext);
	const { isVisible, onHide } = useContext(ModalVisibilityContext);

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

	return isVisible && contextualType === contextualMenu?.type ? createPortal(modal, document.body) : null;
};
