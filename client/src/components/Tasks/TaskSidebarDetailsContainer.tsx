import { FC, useCallback, useContext } from 'react';
import { getDay, getDayName, getMonth, parseUTCtoDate } from '../../utils/date';
import { TaskDetails } from './TaskDetails';
import { addTaskToMyDayAction } from '../../actions/tasks';
import { useTasks } from '../../hooks/useTasks';
import { ElementVisibilityContext } from '../../providers/ElementVisibilityProvider';
import { ITask, ITaskStatus } from '@kkrawczyk/todo-common';
import { Loader, Sun, Bell, Calendar, Repeat, UserPlus, FilePlus, Trash2, XSquare } from 'react-feather';

export const TaskSidebarDetails: FC = () => {
	const { onHide } = useContext(ElementVisibilityContext);
	const { onChangeTaskStatus, taskData, taskDataLoading, removeTaskMutation, listId, changeTaskImportanceMutation } = useTasks();

	const handleClick = useCallback(async (): Promise<void> => {
		try {
			await removeTaskMutation();
			onClose();
		} catch {
			//TODO: handle error & show notificayion
		}
	}, [taskData?._id]);

	const onClose = useCallback((): void => {
		onHide();
	}, []);

	const addTaskToMyDayView = useCallback(() => {
		addTaskToMyDayAction({ parentFolderId: listId, _id: taskData?._id, isMyDay: true });
	}, [taskData?._id]);

	return (
		<div className='bg-light-grey w-[360px] p-4 relative'>
			{taskDataLoading ? (
				<Loader className='m-auto' />
			) : (
				<div className='flex flex-col'>
					<div className='flex p-4 flex-row mb-3 bg-white'>
						<TaskDetails
							taskData={taskData as ITask}
							isCompleted={taskData?.taskStatus === ITaskStatus.complete}
							onChangeTaskStatus={onChangeTaskStatus}
							changeTaskImportance={changeTaskImportanceMutation}
							isTaskDetailsView
						/>
					</div>

					<div className='task-details-style mb-3'>
						<button className='task-details-button-style' onClick={addTaskToMyDayView}>
							<Sun className='mr-2 icon-style' />
							{'Dodaj do widoku "Mój dzień"'}
						</button>
					</div>

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
					<div className='task-details-style mb-3'>
						<div className='task-details-button-style'>
							<Repeat className='mr-2 icon-style' />
							{'Powtórz'}
						</div>
					</div>

					<div className='task-details-style mb-3'>
						<div className='task-details-button-style'>
							<UserPlus className='mr-2 icon-style' />
							{'Przydziel do'}
						</div>
					</div>

					<div className='task-details-style mb-3'>
						<div className='task-details-button-style'>{'Wybierz kategorię'}</div>
					</div>

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
