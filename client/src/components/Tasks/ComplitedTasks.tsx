import { FC, memo } from 'react';
import { Accordion } from '../Accordion/Accordion';
import { useTasks } from '../../hooks/useTasks';
import { SideMenu } from '../../enums';
import { TasksList } from './TasksList';

const ComplitedTasksComponent: FC = () => {
	const { completedTaskslist } = useTasks();

	return (
		<>
			{!!completedTaskslist?.length && (
				<Accordion title={'Wykonane'} details={<span className='ml-1 text-base text-darkerGrey'>{completedTaskslist?.length}</span>}>
					<TasksList tasks={completedTaskslist} redirectUrl={`/${SideMenu.tasks}/`} />
				</Accordion>
			)}
		</>
	);
};

export const ComplitedTasks = memo(ComplitedTasksComponent);
