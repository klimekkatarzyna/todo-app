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
		<div className='bg-light-grey w-80 p-4 relative'>
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

					<div className='flex p-4 flex-col mb-3 bg-white'>
						<div onClick={addTaskToMyDayView}>
							<div className='icon-style text-fontColor'>
								<Sun className='mr-2 icon-style' />
							</div>
						</div>
					</div>

					<div className='flex p-4 flex-col bg-white'>
						<div className='flex text-darkerGrey text-sm'>
							<div className='icon-style text-fontColor'>
								<Bell className='mr-2 icon-style' />
							</div>
							{'Przypomnij'}
						</div>
					</div>
					<div className='flex p-4 flex-col bg-white'>
						<div className='flex text-darkerGrey text-sm'>
							<div className='icon-style text-fontColor'>
								<Calendar className='mr-2 icon-style' />
							</div>
							{'Dodaj termin wykonania'}
						</div>
					</div>
					<div className='flex p-4 flex-col  mb-3 bg-white'>
						<div className='flex text-darkerGrey text-sm'>
							<div className='icon-style text-fontColor'>
								<Repeat className='mr-2 icon-style' />
							</div>
							{'Powtórz'}
						</div>
					</div>

					<div className='flex p-4 flex-col  mb-3 bg-white'>
						<div className='flex text-darkerGrey text-sm'>
							<div className='icon-style text-fontColor'>
								<UserPlus className='mr-2 icon-style' />
							</div>
							{'Przydziel do'}
						</div>
					</div>

					<div className='flex p-4 flex-col  mb-3 bg-white'>
						<div className='flex text-darkerGrey text-sm'>{'Wybierz kategorię'}</div>
					</div>

					<div className='flex p-4 flex-col  mb-3 bg-white'>
						<div className='flex text-darkerGrey text-sm'>
							<div className='icon-style text-fontColor'>
								<FilePlus className='mr-2 icon-style' />
							</div>
							{'Dodaj plik'}
						</div>
					</div>

					<div className='flex p-4 flex-col bg-white'>
						<textarea />
					</div>

					<footer className='flex items-center absolute bottom-4 text-darkerGrey text-sm'>
						<button onClick={onClose} className='border-none bg-inherit cursor-pointer'>
							<div className='icon-style text-fontColor'>
								<XSquare />
							</div>
						</button>
						{`Utworzone ${getDayName(parseUTCtoDate(taskData?.createdAt || ''))}, ${getDay(
							parseUTCtoDate(taskData?.createdAt || '')
						)} ${getMonth(parseUTCtoDate(taskData?.createdAt || ''))}`}
						<button onClick={handleClick} className='border-none bg-inherit cursor-pointer'>
							<div className='icon-style text-fontColor'>
								<Trash2 />
							</div>
						</button>
					</footer>
				</div>
			)}
		</div>
	);
};
