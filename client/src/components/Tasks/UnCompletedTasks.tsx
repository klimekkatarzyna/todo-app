import { FC, memo } from 'react';
import { SortComponent } from '../SortComponent/SortComponent';
import { SideMenu } from '../../enums';
import { TasksList } from './TasksList';
import { ITask, SortTaskString } from '@kkrawczyk/todo-common';

const UnCompletedTasksComponent: FC<{ tasks: ITask[]; requestSort: (data: SortTaskString) => void }> = ({ tasks, requestSort }) => {
	return (
		<>
			<SortComponent sortFunction={requestSort} />
			<TasksList tasks={tasks} redirectUrl={`/${SideMenu.tasks}/`} />
		</>
	);
};

export const UnCompletedTasks = memo(UnCompletedTasksComponent);
