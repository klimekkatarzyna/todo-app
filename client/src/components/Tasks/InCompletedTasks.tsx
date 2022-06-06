import { FC, memo } from 'react';
import { SortComponent } from '../SortComponent/SortComponent';
import { useTasks } from '../../hooks/useTasks';
import { SideMenu } from '../../enums';
import { TasksList } from './TasksList';

const InCompletedTasksComponent: FC = () => {
	const { inCompletedTaskslist, requestSort } = useTasks();

	return (
		<>
			<SortComponent requestSort={requestSort} />
			<TasksList tasks={inCompletedTaskslist} redirectUrl={`/${SideMenu.tasks}/`} />
		</>
	);
};

export const InCompletedTasks = memo(InCompletedTasksComponent);
