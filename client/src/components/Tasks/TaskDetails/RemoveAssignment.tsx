import { FC } from 'react';
import { ITask } from '@kkrawczyk/todo-common';
import { IconUserName } from '../../IconUserName/IconUserName';

interface IRemoveAssignmentProps {
	taskData: ITask;
}

export const RemoveAssignment: FC<IRemoveAssignmentProps> = ({ taskData }) => {
	return (
		<button className='task-details-style mb-3' onClick={() => {}}>
			<IconUserName member={taskData?.assigned} isFullNameVisible />
		</button>
	);
};
