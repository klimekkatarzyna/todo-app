import React, { FC, useCallback, useState } from 'react';
import { taskInMyDayAction } from '../../../actions/tasks';
import { Sun, X, Loader } from 'react-feather';
import { useMutation, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';
import { ITask } from '@kkrawczyk/todo-common';
import { QueryKey } from '../../../enums';

interface IAddTaskToMyDay {
	taskData: ITask | undefined;
}

export const AddTaskToMyDay: FC<IAddTaskToMyDay> = ({ taskData }) => {
	const query = useQueryClient();
	const [isMyDayTask, setIsMyDayTask] = useState<boolean>(false);

	const { mutate, error, isLoading } = useMutation(taskInMyDayAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.tasksOfCurrentList]);
			query.invalidateQueries([QueryKey.getTask]);
			query.invalidateQueries([QueryKey.getMyDayTasks]);
			query.invalidateQueries([QueryKey.tasksList]);
			toast.success(taskData?.isMyDay ? 'Zadanie usunięte z widoku "Mój dzień"' : 'Zadanie dodane do "Mój dzień');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	const onHandleTaskInMyDayView = useCallback(async () => {
		setIsMyDayTask(!isMyDayTask);
		await mutate({ _id: taskData?._id, isMyDay: isMyDayTask });
	}, [taskData?._id, isMyDayTask]);

	return (
		<div className='task-details-style mb-6'>
			{isLoading && <Loader />}
			<button className='task-details-button-style' onClick={onHandleTaskInMyDayView}>
				<Sun className='mr-2 icon-style' />
				{taskData?.isMyDay ? (
					<>
						<span className={`${taskData?.isMyDay && 'text-blue'}`}>{'Dodano do widoku "Mój dzień'}</span>
						<X className='ml-auto icon-style' />
					</>
				) : (
					'Dodaj do widoku "Mój dzień"'
				)}
			</button>
		</div>
	);
};
