import { FC, useCallback, useContext, useMemo } from 'react';
import { getDay, getDayName, getMonth, parseUTCtoDate } from '../../utils/date';
import { TaskDetails } from './TaskDetails';
import { useTasks } from '../../hooks/useTasks';
import { ElementVisibilityContext } from '../../providers/ElementVisibilityProvider';
import { ITask, ITaskStatus } from '@kkrawczyk/todo-common';
import { Loader, Bell, Calendar, Repeat, FilePlus, Trash2, XSquare } from 'react-feather';
import { AddTaskToMyDay } from './TaskDetails/AddTaskToMyDay';
import { useHistory } from 'react-router-dom';
import { AssignTo } from './TaskDetails/AssignTo';

export const TaskSidebarDetails: FC = () => {
	const history = useHistory();
	const { onHide } = useContext(ElementVisibilityContext);
	const { onChangeTaskStatus, taskData, taskDataLoading, removeTaskMutation, changeTaskImportanceMutation } = useTasks();

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

	const [, url, listId] = useMemo(() => history.location.pathname.split('/'), [history]);

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
							redirectTo={`/${url}/`}
						/>
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

					<AssignTo listId={listId} />

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
