import { FC, useCallback, useContext } from 'react';
import { IconWrapper } from '../../constants';
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
							<IconWrapper color='grey'>
								<Sun strokeWidth={1} className='mr-2' />
							</IconWrapper>
						</div>
					</div>

					<div className='flex p-4 flex-col bg-white'>
						<div className='flex text-darkerGrey text-sm'>
							<IconWrapper color='grey'>
								<Bell strokeWidth={1} className='mr-2' />
							</IconWrapper>
							{'Przypomnij'}
						</div>
					</div>
					<div className='flex p-4 flex-col bg-white'>
						<div className='flex text-darkerGrey text-sm'>
							<IconWrapper color='grey'>
								<Calendar strokeWidth={1} className='mr-2' />
							</IconWrapper>
							{'Dodaj termin wykonania'}
						</div>
					</div>
					<div className='flex p-4 flex-col  mb-3 bg-white'>
						<div className='flex text-darkerGrey text-sm'>
							<IconWrapper color='grey'>
								<Repeat strokeWidth={1} className='mr-2' />
							</IconWrapper>
							{'Powtórz'}
						</div>
					</div>

					<div className='flex p-4 flex-col  mb-3 bg-white'>
						<div className='flex text-darkerGrey text-sm'>
							<IconWrapper color='grey'>
								<UserPlus strokeWidth={1} className='mr-2' />
							</IconWrapper>
							{'Przydziel do'}
						</div>
					</div>

					<div className='flex p-4 flex-col  mb-3 bg-white'>
						<div className='flex text-darkerGrey text-sm'>{'Wybierz kategorię'}</div>
					</div>

					<div className='flex p-4 flex-col  mb-3 bg-white'>
						<div className='flex text-darkerGrey text-sm'>
							<IconWrapper color='grey'>
								<FilePlus strokeWidth={1} className='mr-2' />
							</IconWrapper>
							{'Dodaj plik'}
						</div>
					</div>

					<div className='flex p-4 flex-col bg-white'>
						<textarea />
					</div>

					<footer className='flex items-center absolute bottom-4 text-darkerGrey text-sm'>
						<button onClick={onClose} className='border-none bg-inherit cursor-pointer'>
							<IconWrapper color='grey'>
								<XSquare strokeWidth={1} />
							</IconWrapper>
						</button>
						{`Utworzone ${getDayName(parseUTCtoDate(taskData?.createdAt || ''))}, ${getDay(
							parseUTCtoDate(taskData?.createdAt || '')
						)} ${getMonth(parseUTCtoDate(taskData?.createdAt || ''))}`}
						<button onClick={handleClick} className='border-none bg-inherit cursor-pointer'>
							<IconWrapper color='grey'>
								<Trash2 strokeWidth={1} />
							</IconWrapper>
						</button>
					</footer>
				</div>
			)}
		</div>
	);
};
