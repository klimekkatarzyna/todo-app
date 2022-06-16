import { FC, useCallback, useEffect, useMemo } from 'react';
import { getDay, getDayName, getMonth, parseUTCtoDate } from '../../utils/date';
import { TaskDetails } from './TaskDetails';
import { useTasks } from '../../hooks/useTasks';
import { Loader, Bell, Calendar, Repeat, FilePlus, Trash2, XSquare } from 'react-feather';
import { AddTaskToMyDay } from './TaskDetails/AddTaskToMyDay';
import { useHistory } from 'react-router-dom';
import { AssignComponent } from './TaskDetails/AssignComponent';
import { useRecoilState } from 'recoil';
import { elementVisibilityState } from '../../atoms/elementVisibility';
import { useTask } from '../../hooks/tasks/useTask';

export const TaskSidebarDetails: FC = () => {
	const history = useHistory();
	const [isElementVisible, setIsElementVisible] = useRecoilState(elementVisibilityState);
	const { removeTaskMutation } = useTasks();
	const { taskData, taskDataLoading } = useTask();

	const [, url, listId, taskId] = useMemo(() => history.location.pathname.split('/'), [history]);

	useEffect(() => {
		if (!!listId && !!taskId) return;
		setIsElementVisible(false);
	}, [listId, taskId]);

	const handleClick = useCallback(async (): Promise<void> => {
		await removeTaskMutation();
		onClose();
	}, [taskData?._id]);

	const onClose = useCallback((): void => {
		setIsElementVisible(false);
	}, [setIsElementVisible]);

	return (
		<div className='bg-light-grey w-full p-4 absolute z-20 left-0 right-0 top-12 bottom-0 md:relative md:w-[360px] md:top-0'>
			{taskDataLoading ? (
				<Loader className='m-auto' />
			) : (
				<div className='flex flex-col'>
					<div className='flex p-4 flex-row mb-3 bg-white'>
						<TaskDetails taskData={taskData} isTaskDetailsView redirectTo={`/${url}/`} />
					</div>

					<AddTaskToMyDay taskData={taskData} />

					<div className='task-details-style'>
						<div className='task-details-button-style'>
							<Bell className='mr-2 icon-style' />
							{'Przypomnij'}
						</div>
					</div>
					<div className='task-details-style'>
						<div className='task-details-button-style'>
							<Calendar className='mr-2 icon-style' />
							{'Dodaj termin wykonania'}
						</div>
					</div>
					<div className='task-details-style mb-6'>
						<div className='task-details-button-style'>
							<Repeat className='mr-2 icon-style' />
							{'Powtórz'}
						</div>
					</div>

					<AssignComponent listId={listId} taskId={taskId} taskData={taskData} />

					<div className='task-details-style mb-3'>
						<div className='task-details-button-style'>
							<FilePlus className='mr-2 icon-style' />
							{'Dodaj plik'}
						</div>
					</div>

					<div className='task-details-style'>
						<textarea />
					</div>

					<footer className='flex items-center absolute bottom-4 text-darkerGrey text-sm'>
						<button onClick={onClose} className='border-none bg-inherit cursor-pointer'>
							<XSquare className='icon-style text-fontColor mr-4' />
						</button>
						{`Utworzone ${getDayName(parseUTCtoDate(taskData?.createdAt || ''))}, ${getDay(
							parseUTCtoDate(taskData?.createdAt || '')
						)} ${getMonth(parseUTCtoDate(taskData?.createdAt || ''))}`}
						<button onClick={handleClick} className='border-none bg-inherit cursor-pointer'>
							<Trash2 className='icon-style text-fontColor ml-4' />
						</button>
					</footer>
				</div>
			)}
		</div>
	);
};
