import { FC, memo } from 'react';
import { Accordion } from '../Accordion/Accordion';
import { SideMenu } from '../../enums';
import { TasksList } from './TasksList';
import { ITask } from '@kkrawczyk/todo-common';

interface IComplitedTasksComponentProps {
	tasks: ITask[];
}

const ComplitedTasksComponent: FC<IComplitedTasksComponentProps> = ({ tasks }) => {
	return (
		<>
			{!!tasks?.length && (
				<Accordion title={'Wykonane'} details={<span className='ml-1 text-base text-darkerGrey'>{tasks?.length}</span>}>
					<TasksList tasks={tasks} redirectUrl={`/${SideMenu.tasks}/`} />
				</Accordion>
			)}
		</>
	);
};

export const ComplitedTasks = memo(ComplitedTasksComponent);
