import { FC, memo } from 'react';
import { Accordion } from '../../common/Accordion/Accordion';
import { SideMenu } from '../../enums';
import { TasksList } from './TasksList';
import { ITask } from '@kkrawczyk/todo-common';

const ComplitedTasksComponent: FC<{ tasks: ITask[] }> = ({ tasks }) => {
	return (
		<>
			{!!tasks?.length && (
				<Accordion title={'Wykonane'} details={<span className='ml-1 text-base text-darkerGrey completed'>{tasks?.length}</span>}>
					<TasksList tasks={tasks} redirectUrl={`/${SideMenu.tasks}/`} />
				</Accordion>
			)}
		</>
	);
};

export const ComplitedTasks = memo(ComplitedTasksComponent);
