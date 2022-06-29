import React, { FC, useCallback, useContext, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilState } from 'recoil';
import { modalVisibilityState } from '../../atoms/modal';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { ContextMenuOpion } from '../../enums';
import { TasksContextMenuContext } from '../../providers/TasksContextMenuProvider';
import { ModalComponent } from './ModalComponent';

interface IContextualModalProps<T> {
	children?: React.ReactNode;
	title: string;
	contextualType?: ContextMenuOpion;
	onHandleAction?: any;
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
	const { contextualMenu, setContextMenu } = useContext(ContextMenuContext);
	const { tasksContextlMenu, setTasksContextMenu } = useContext(TasksContextMenuContext);
	const [isVisible, setIsVisible] = useRecoilState(modalVisibilityState);

	const isTaskAction = useMemo(() => contextualType === ContextMenuOpion.remove_task, [contextualType]);

	const onHide = useCallback(() => {
		setIsVisible(false);
		setTasksContextMenu(undefined);
		setContextMenu(undefined);
	}, [setIsVisible]);

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

	return isVisible && contextualType === (isTaskAction ? tasksContextlMenu?.type : contextualMenu?.type)
		? createPortal(modal, document.body)
		: null;
};
