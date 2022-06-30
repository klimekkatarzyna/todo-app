import { FC, memo } from 'react';
import { SortComponent } from '../SortComponent/SortComponent';
import { SideMenu } from '../../enums';
import { TasksList } from './TasksList';
import { ITask } from '@kkrawczyk/todo-common';

const InCompletedTasksComponent: FC<{ tasks: ITask[]; requestSort: (event: any) => void }> = ({ tasks, requestSort }) => {
	return (
		<>
			<SortComponent requestSort={requestSort} />
			<TasksList tasks={tasks} redirectUrl={`/${SideMenu.tasks}/`} />
		</>
	);
};

export const InCompletedTasks = memo(InCompletedTasksComponent);
