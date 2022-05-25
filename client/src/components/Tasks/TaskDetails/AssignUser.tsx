import { FC } from 'react';
import { UserPlus } from 'react-feather';

interface IAssignUserProps {
	onHandleAction: () => void;
}

export const AssignUser: FC<IAssignUserProps> = ({ onHandleAction }) => {
	return (
		<button className='task-details-style mb-3' onClick={onHandleAction}>
			<div className='task-details-button-style'>
				<UserPlus className='mr-2 icon-style' />
				{'Przydziel do'}
			</div>
		</button>
	);
};
