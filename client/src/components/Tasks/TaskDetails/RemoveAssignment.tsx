import { FC } from 'react';
import { ITask } from '@kkrawczyk/todo-common';
import { IconUserName } from '../../IconUserName/IconUserName';
import { useMutation, useQueryClient } from 'react-query';
import { removenUserFromTaskAction } from '../../../actions/tasks';
import { QueryKey } from '../../../enums';
import toast from 'react-hot-toast';
import { Loader, X } from 'react-feather';

interface IRemoveAssignmentProps {
	taskData: ITask;
}

export const RemoveAssignment: FC<IRemoveAssignmentProps> = ({ taskData }) => {
	const query = useQueryClient();

	const { mutate, isLoading } = useMutation(removenUserFromTaskAction, {
		onSuccess: () => {
			query.invalidateQueries([QueryKey.tasksOfCurrentList]);
			query.invalidateQueries([QueryKey.getTask]);
			query.invalidateQueries([QueryKey.getAssignedTasks]);
			query.invalidateQueries([QueryKey.tasksList]);
			toast.success('Przypisanie usunięte');
		},
		onError: error => {
			toast.error(`Coś poszlo nie tak: ${error}`);
		},
	});

	return (
		<button className='task-details-style mb-3 flex flex-row items-center pt-3 pb-3 pl-4' onClick={() => mutate({ _id: taskData?._id })}>
			<IconUserName member={taskData?.assigned} isFullNameVisible />
			{isLoading && <Loader />}
			<X className='icon-style ml-auto mr-4' />
		</button>
	);
};
