import { FC, useCallback, useEffect, useMemo, useState, RefObject, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { ImportanceButton } from '../../common/ImportanceButton/ImportanceButton';
import { Importance, ITask, ITaskStatus } from '@kkrawczyk/todo-common';
import { useFocusingHandling } from '../../hooks/useMouseHandling';
import { EditTaskName } from './EditTaskName';
import { Sun } from 'react-feather';
import { IconUserName } from '../../common/IconUserName/IconUserName';
import { useTasksStatus } from '../../hooks/tasks/useTasksStatus';
import { useTaskImportance } from '../../hooks/tasks/useTaskImportance';

interface ITaskDetailsProps {
	taskData: ITask | undefined;
	isTaskDetailsView?: boolean | undefined;
	redirectTo: string;
}

const TaskDetailsComponent: FC<ITaskDetailsProps> = ({ taskData, isTaskDetailsView, redirectTo }) => {
	const { changeTaskStatusMutation } = useTasksStatus();
	const { changeTaskImportanceMutation } = useTaskImportance();

	const isCompleted = useMemo(() => taskData?.taskStatus === ITaskStatus.complete, [taskData]);

	const tooltipText = useMemo(
		() => (taskData?.taskStatus === ITaskStatus.complete ? 'oznacz jako niewykonane' : 'oznacz jako wykonane'),
		[taskData]
	);

	const [isImportanceButtonChecked, setIsImportanceButtonChecked] = useState<boolean>(taskData?.importance === Importance.high);
	const importanceType: Importance = useMemo(() => (!isImportanceButtonChecked ? Importance.high : Importance.normal), [isImportanceButtonChecked]);

	useEffect(() => {
		setIsImportanceButtonChecked(taskData?.importance === Importance.high);
	}, [taskData, setIsImportanceButtonChecked]);

	const onHandleChange = useCallback(async () => {
		const taskStatus = taskData?.taskStatus === ITaskStatus.inComplete ? ITaskStatus.complete : ITaskStatus.inComplete;
		await changeTaskStatusMutation({ _id: taskData?._id, parentFolderId: taskData?.parentFolderId, taskStatus });
	}, [taskData, changeTaskStatusMutation]);

	const onClickImportanceButton = useCallback(async () => {
		setIsImportanceButtonChecked(!isImportanceButtonChecked);
		await changeTaskImportanceMutation({ parentFolderId: taskData?.parentFolderId, _id: taskData?._id, importance: importanceType });
	}, [isImportanceButtonChecked, taskData, importanceType, changeTaskImportanceMutation]);

	const elementRef: RefObject<HTMLInputElement> = useRef(null);
	const { isFocused, onClick, onBlur } = useFocusingHandling(elementRef);

	return (
		<>
			<Checkbox
				name='status'
				checked={taskData?.taskStatus === ITaskStatus.complete}
				onChange={onHandleChange}
				tooltipText={tooltipText}
				color={taskData?.themeColor}
			/>
			<Link
				to={`${redirectTo}${taskData?.parentFolderId}/${taskData?._id}`}
				draggable
				className='flex flex-col flex-1 text-left ml-4 mr-auto border-none bg-inherit outline-none cursor-pointer no-underline'>
				<div
					id='task-title-element'
					className={`cursor-pointer ${isCompleted && 'line-through'} ${isCompleted ? 'text-darkerGrey' : 'text-fontColor'} ${
						isTaskDetailsView && 'hover:bg-lightGrey'
					}`}
					ref={elementRef}
					onClick={onClick}
					onBlur={onBlur}>
					{isFocused && isTaskDetailsView ? <EditTaskName taskData={taskData} /> : taskData?.title}
				</div>
				<div>{taskData?.groupName && <span className='inline-flex text-sm mr-4 text-darkerGrey'>{taskData?.groupName}</span>}</div>

				{!isTaskDetailsView && taskData?.isMyDay && (
					<div className='flex flex-row text-xs items-center'>
						<Sun className='mr-2 icon-style' /> {'Mój dzień'}
					</div>
				)}
			</Link>
			{!isTaskDetailsView && !!taskData?.assigned?.length && <IconUserName member={taskData?.assigned} />}
			<ImportanceButton isChecked={isImportanceButtonChecked} onClick={onClickImportanceButton} />
		</>
	);
};

export const TaskDetails = memo(TaskDetailsComponent);
