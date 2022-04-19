import { FC, useCallback, useEffect, useMemo, useState, RefObject, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { IUseParams } from '../../interfaces/app';
import { Checkbox } from '../Checkbox/Checkbox';
import { ImportanceButton } from '../ImportanceButton/ImportanceButton';
import { Importance, ITask, ITaskStatus } from '@kkrawczyk/todo-common';
import { useFocusingHandling } from '../../hooks/useMouseHandling';
import { EditTaskName } from './EditTaskName';

interface ITaskDetailsProps {
	taskData: ITask;
	onChangeTaskStatus?: (taskId: string | undefined) => void;
	isCompleted?: boolean;
	changeTaskImportance: ({ parentFolderId: listId, _id: taskId, importance }: ITask) => void;
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
		() => (taskData?.taskStatus === ITaskStatus.complete ? 'oznacz jako niewykonane' : 'oznacz jako wykonane'),
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
		changeTaskImportance({ parentFolderId: taskData.parentFolderId, _id: taskData._id, importance: importanceType });
	}, [isImportanceButtonChecked]);

	const elementRef: RefObject<HTMLInputElement> = useRef(null);
	const { isFocused, onClick } = useFocusingHandling(elementRef);

	return (
		<>
			<Checkbox
				checked={taskData?.taskStatus === ITaskStatus.complete}
				color={taskData?.themeColor}
				onChange={onHandleChange}
				tooltipText={tooltipText}
			/>
			<Link
				to={`/tasks/${listId}/${taskData?._id}`}
				draggable
				className='flex flex-col flex-1 text-left ml-4 mr-auto border-none bg-inherit outline-none cursor-pointer no-underline'>
				<div
					className={`cursor-pointer ${isCompleted && 'line-through'} ${isCompleted ? 'text-darkerGrey' : 'text-fontColor'} ${
						isTaskDetailsView && 'hover:bg-lightGrey'
					}`}
					ref={elementRef}
					onClick={onClick}>
					{isFocused && isTaskDetailsView ? <EditTaskName taskData={taskData} /> : taskData?.title}
				</div>
				<div>{taskData?.groupName && <span className='inline-flex text-sm mr-4 text-darkerGrey'>{taskData?.groupName}</span>}</div>
			</Link>
			<ImportanceButton isChecked={isImportanceButtonChecked} onClick={onClickImportanceButton} />
		</>
	);
};

export const TaskDetails = memo(TaskDetailsComponent);
