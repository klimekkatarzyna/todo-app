import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { COLOURS } from '../../constants';
import { IChangeTaskImportanceProps, ITask, ITaskStatus } from '../../interfaces/task';
import { IUseParams } from '../../interfaces/app';
import { getDay, getDayName, getMonth, parseUTCtoDate } from '../../utils/date';
import { Checkbox } from '../Checkbox/Checkbox';
import { ImportanceButton } from '../ImportanceButton/ImportanceButton';
import { Importance } from '../../enums';

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

const TaskName = styled.div<{ isCompleted: boolean }>`
	color: ${COLOURS.fontColor};
	cursor: pointer;
	${props =>
		props.isCompleted &&
		css`
			text-decoration: line-through;
			color: ${COLOURS.darkerGrey};
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
	onChangeTaskStatus?: (taskId: string) => void;
	isCompleted?: boolean;
	changeTaskImportance: ({ listId, taskId, importance }: IChangeTaskImportanceProps) => void;
}

export const TaskDetails: FC<ITaskDetailsProps> = ({ taskData, onChangeTaskStatus, isCompleted = false, changeTaskImportance }) => {
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
				<TaskName isCompleted={isCompleted}>{taskData?.title}</TaskName>
				<div>
					{taskData?.groupName && <GroupName>{taskData?.groupName}</GroupName>}
					{/* {taskData?.createdAt && <TaskItemInfo color={taskData?.themeColor}>{`${getDayName(parseUTCtoDate(taskData?.createdAt))}, ${getDay(parseUTCtoDate(taskData?.createdAt))} ${getMonth(parseUTCtoDate(taskData?.createdAt))}`}</TaskItemInfo>} */}
				</div>
			</Names>
			<ImportanceButton isChecked={isImportanceButtonChecked} onClick={onClickImportanceButton} />
		</>
	);
};
