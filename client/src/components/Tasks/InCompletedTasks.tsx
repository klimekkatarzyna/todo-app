import { FC, memo } from 'react';
import { SortComponent } from '../SortComponent/SortComponent';
import { useTasks } from '../../hooks/useTasks';
import { SideMenu } from '../../enums';
import { TasksList } from './TasksList';
import { ITask } from '@kkrawczyk/todo-common';

interface IInCompletedTasksComponentProps {
	tasks: ITask[];
}

const InCompletedTasksComponent: FC<IInCompletedTasksComponentProps> = ({ tasks }) => {
	const { requestSort } = useTasks();

	return (
		<>
			<SortComponent requestSort={requestSort} />
			<TasksList tasks={tasks} redirectUrl={`/${SideMenu.tasks}/`} />
		</>
	);
};

export const InCompletedTasks = memo(InCompletedTasksComponent);
