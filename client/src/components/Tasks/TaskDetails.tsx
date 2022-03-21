import { FC, useCallback, useEffect, useMemo, useState, RefObject, useRef, memo } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { COLOURS } from '../../constants';
import { IChangeTaskImportanceProps, ITaskStatus } from '../../interfaces/task';
import { IUseParams } from '../../interfaces/app';
import { getDay, getDayName, getMonth, parseUTCtoDate } from '../../utils/date';
import { Checkbox } from '../Checkbox/Checkbox';
import { ImportanceButton } from '../ImportanceButton/ImportanceButton';
import { Importance } from '@kkrawczyk/common/types';
import { useFocusingHandling } from '../../hooks/useMouseHandling';
import { EditTaskName } from './EditTaskName';
import { ITask } from '@kkrawczyk/common/types';

const Names = styled(Link)`
	display: flex;
	flex-direction: column;
	flex: 1;
	text-align: left;
	margin-left: 1rem;
	margin-right: auto;
	border: none;
	background-color: inherit;
	outline: none;
	cursor: pointer;
	text-decoration: none;
`;

const TaskName = styled.div<{ isCompleted: boolean; isTaskDetailsView: boolean | undefined }>`
	color: ${COLOURS.fontColor};
	cursor: pointer;
	${props =>
		props.isCompleted &&
		css`
			text-decoration: line-through;
			color: ${COLOURS.darkerGrey};
		`};

	${props =>
		props.isTaskDetailsView &&
		css`
			&:hover {
				background-color: ${COLOURS.lightGrey};
			}
		`};
`;

const GroupName = styled.span`
	display: inline-flex;
	color: ${COLOURS.darkerGrey};
	font-size: 0.8rem;
	margin-right: 1rem;
`;

const TaskItemInfo = styled.span<{ color: string }>`
	color: ${props => (props.color ? `${COLOURS[props.color]}` : `${COLOURS.fontColor}`)};
	font-size: 0.8rem;
`;

interface ITaskDetailsProps {
	taskData: ITask;
	onChangeTaskStatus?: (taskId: string | undefined) => void;
	isCompleted?: boolean;
	changeTaskImportance: ({ listId, taskId, importance }: IChangeTaskImportanceProps) => void;
	isTaskDetailsView?: boolean | undefined;
}

const TaskDetailsComponent: FC<ITaskDetailsProps> = ({
	taskData,
	onChangeTaskStatus,
	isCompleted = false,
	changeTaskImportance,
	isTaskDetailsView,
}) => {
	const { listId } = useParams<IUseParams>();
	const tooltipText = useMemo(
		() => (taskData?.importance === ITaskStatus.complete ? 'oznacz jako niewykonane' : 'oznacz jako wykonane'),
		[taskData]
	);

	const [isImportanceButtonChecked, setIsImportanceButtonChecked] = useState<boolean>(taskData?.importance === Importance.high);
	const importanceType: Importance = useMemo(() => (!isImportanceButtonChecked ? Importance.high : Importance.normal), [isImportanceButtonChecked]);

	useEffect(() => {
		setIsImportanceButtonChecked(taskData?.importance === Importance.high);
	}, [taskData]);

	const onHandleChange = useCallback((): void => {
		onChangeTaskStatus?.(taskData._id);
	}, [taskData]);

	const onClickImportanceButton = useCallback(() => {
		setIsImportanceButtonChecked(!isImportanceButtonChecked);
		changeTaskImportance({ listId: taskData.parentFolderId, taskId: taskData._id, importance: importanceType });
	}, [isImportanceButtonChecked]);

	const elementRef: RefObject<HTMLInputElement> = useRef(null);
	const { isFocused, onClick } = useFocusingHandling(elementRef);

	return (
		<>
			<Checkbox
				round
				checked={taskData?.taskStatus === ITaskStatus.complete}
				color={taskData?.themeColor}
				onChange={onHandleChange}
				tooltipText={tooltipText}
			/>
			<Names to={`/tasks/${listId}/${taskData?._id}`} draggable>
				<TaskName isCompleted={isCompleted} isTaskDetailsView={isTaskDetailsView} ref={elementRef} onClick={onClick}>
					{isFocused && isTaskDetailsView ? <EditTaskName taskData={taskData} /> : taskData?.title}
				</TaskName>
				<div>
					{taskData?.groupName && <GroupName>{taskData?.groupName}</GroupName>}
					{/* {taskData?.createdAt && <TaskItemInfo color={taskData?.themeColor}>{`${getDayName(parseUTCtoDate(taskData?.createdAt))}, ${getDay(parseUTCtoDate(taskData?.createdAt))} ${getMonth(parseUTCtoDate(taskData?.createdAt))}`}</TaskItemInfo>} */}
				</div>
			</Names>
			<ImportanceButton isChecked={isImportanceButtonChecked} onClick={onClickImportanceButton} />
		</>
	);
};

export const TaskDetails = memo(TaskDetailsComponent);
