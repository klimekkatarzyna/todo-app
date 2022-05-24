import { ITask } from '@kkrawczyk/todo-common';
import { FC } from 'react';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useTasks } from '../../hooks/useTasks';
import { TaskItem } from './TaskItem/TaskItem';

interface ITasksListProps {
	tasks: ITask[] | undefined;
	redirectUrl: string;
}

export const TasksList: FC<ITasksListProps> = ({ tasks, redirectUrl }) => {
	const { inCompletedTaskslist, setInCompletedTasksList, onChangeTaskStatus, changeTaskImportanceMutation } = useTasks();
	const { onDragStart, onDragOver, onDragLeave, onDrop, dragAndDrop } = useDragAndDrop(inCompletedTaskslist, setInCompletedTasksList);

	return (
		<>
			{tasks?.map((task, index) => (
				<TaskItem
					key={task._id}
					task={task}
					index={index}
					redirectTo={redirectUrl}
					dragAndDrop={dragAndDrop}
					onDragStart={onDragStart}
					onDragOver={onDragOver}
					onDrop={onDrop}
					onDragLeave={onDragLeave}
					onChangeTaskStatus={onChangeTaskStatus}
					changeTaskImportance={changeTaskImportanceMutation}
				/>
			))}
		</>
	);
};
