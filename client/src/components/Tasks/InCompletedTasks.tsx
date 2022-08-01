import { FC, memo } from 'react';
import { SortComponent } from '../SortComponent/SortComponent';
import { SideMenu } from '../../enums';
import { TasksList } from './TasksList';
import { ITask } from '@kkrawczyk/todo-common';

const InCompletedTasksComponent: FC<{ tasks: ITask[] }> = ({ tasks }) => {
	return (
		<>
			<SortComponent />
			<TasksList tasks={tasks} redirectUrl={`/${SideMenu.tasks}/`} />
		</>
	);
};

export const InCompletedTasks = memo(InCompletedTasksComponent);
