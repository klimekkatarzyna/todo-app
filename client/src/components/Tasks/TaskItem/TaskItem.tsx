import { FC, useCallback, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { ContextMenuTrigger } from 'react-contextmenu';
import { COLOURS, contextualMenuFirstOpion } from '../../../constants';
import { IChangeTaskImportanceProps } from '../../../interfaces/task';
import { IinitialDnDState } from '../../../hooks/useDragAndDrop';
import { ContextualMenu } from '../../ContextualMenu/ContextualMenu';
import { TaskDetails } from '../TaskDetails';
import { ElementVisibilityContext } from '../../../providers/ElementVisibilityProvider';
import { ITask } from '@kkrawczyk/common/src/types';

const TaskItemWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 0.6rem;
	min-height: 34px;
	cursor: pointer;
	box-shadow: 0 17px 0 -16px #e5e5e5;

	&:hover {
		background-color: ${COLOURS.lightGrey};
	}

	&:active {
		background-color: ${COLOURS.lightBlue};
	}

	&.dropArea {
		background: white !important;
		position: relative;

		&::before {
			content: '';
			color: ${COLOURS.blue};
			font-size: 0.5em;
			text-transform: uppercase;
			width: 100%;
			height: 100%;
			border-bottom: 2px solid ${COLOURS.blue};
			position: absolute;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
`;

interface ITaskItem {
	task: ITask;
	index: number;
	onChangeTaskStatus: (taskId: string | undefined) => void;
	isCompleted?: boolean;
	dragAndDrop?: IinitialDnDState<ITask>;
	onDragStart?: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
	onDragOver?: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
	onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
	onDragLeave?: () => void;
	changeTaskImportance: ({ listId, taskId, importance }: IChangeTaskImportanceProps) => void;
}

export const TaskItem: FC<ITaskItem> = ({
	task,
	index,
	onChangeTaskStatus,
	isCompleted = false,
	dragAndDrop,
	onDragStart,
	onDragOver,
	onDrop,
	onDragLeave,
	changeTaskImportance,
}) => {
	const { onShow } = useContext(ElementVisibilityContext);
	const dragAndDropClass = useMemo(
		() => (dragAndDrop?.draggedTo !== 0 && dragAndDrop?.draggedTo === Number(index) ? 'dropArea' : ''),
		[dragAndDrop]
	);

	const onSelectTask = useCallback((): void => {
		onShow();
	}, [onShow]);

	return (
		<>
			<ContextMenuTrigger id={task?._id as string}>
				<TaskItemWrapper
					key={index}
					draggable
					data-position={index}
					onDragStart={onDragStart as any} // TODO: fix
					onDragOver={onDragOver as any} // TODO: fix
					onDrop={onDrop}
					onDragLeave={onDragLeave}
					onClick={onSelectTask}
					className={dragAndDropClass}>
					<TaskDetails
						taskData={task}
						onChangeTaskStatus={onChangeTaskStatus}
						isCompleted={isCompleted}
						changeTaskImportance={changeTaskImportance}
					/>
				</TaskItemWrapper>
			</ContextMenuTrigger>
			<ContextualMenu contextualMenuList={contextualMenuFirstOpion} elementId={task?._id || ''} />
		</>
	);
};
