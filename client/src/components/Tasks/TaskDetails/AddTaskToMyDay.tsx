import { FC, useCallback } from 'react';
import { Sun, X, Loader } from 'react-feather';
import { ITask } from '@kkrawczyk/todo-common';
import { useTasksInMyDay } from '../../../hooks/tasks/useTasksInMyDay';
import { useRecoilState } from 'recoil';
import { elementVisibilityState } from '../../../atoms/elementVisibility';

export const AddTaskToMyDay: FC<{ taskData: ITask | undefined }> = ({ taskData }) => {
	const { taskInMyDayLoading, taskInMyDayMutation } = useTasksInMyDay();
	const [, setIsElementVisible] = useRecoilState(elementVisibilityState);

	const onHandleTaskInMyDay = useCallback(() => {
		taskInMyDayMutation({ _id: taskData?._id, isMyDay: !taskData?.isMyDay, parentFolderId: taskData?.parentFolderId });
		setIsElementVisible(false);
	}, [taskData, taskInMyDayMutation, setIsElementVisible]);

	return (
		<div className='task-details-style mb-6'>
			{taskInMyDayLoading && <Loader />}
			<button className='task-details-button-style' onClick={onHandleTaskInMyDay}>
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
