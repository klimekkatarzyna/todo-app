import React, { FC, useContext, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ContextMenuContext } from '../../ContextMenuProvider';
import { ContextMenuOpion } from '../../enums';
import { ModalVisibilityContext } from '../../ModalVisibilityProvider';
import { TasksContextMenuContext } from '../../providers/TasksContextMenuProvider';
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
	const { contextualMenu, setContextMenu } = useContext(ContextMenuContext);
	const { tasksContextlMenu, setTasksContextMenu } = useContext(TasksContextMenuContext);
	const { isVisible, onHide } = useContext(ModalVisibilityContext);

	const isTaskAction = useMemo(() => contextualType === ContextMenuOpion.remove_task, [contextualType]);

	const modal = (
		<ModalComponent
			children={children}
			title={title}
			onHandleAction={onHandleAction}
			isActionButtonHidden={isActionButtonHidden}
			isLoading={isLoading}
			onHide={onHide}
			setContextMenu={isTaskAction ? setTasksContextMenu : setContextMenu}
		/>
	);

	return isVisible && contextualType === (isTaskAction ? tasksContextlMenu?.type : contextualMenu?.type)
		? createPortal(modal, document.body)
		: null;
};
