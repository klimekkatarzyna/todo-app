import { FC } from 'react';
import { ITask } from '@kkrawczyk/todo-common';
import { UserPlus } from 'react-feather';
import { useRecoilState } from 'recoil';
import { modalVisibilityState } from '../../../atoms/modal';

interface IAssignUserProps {
	taskData: ITask | undefined;
}

export const AssignUser: FC<IAssignUserProps> = ({ taskData }) => {
	const [isVisible, setIsVisible] = useRecoilState(modalVisibilityState);

	return (
		<button className='task-details-style mb-3' onClick={() => setIsVisible(true)}>
			<div className='task-details-button-style'>
				<UserPlus className='mr-2 icon-style' />
				{'Przydziel do'}
			</div>
		</button>
	);
};
