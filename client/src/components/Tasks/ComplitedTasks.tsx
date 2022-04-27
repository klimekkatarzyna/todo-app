import { FC, memo } from 'react';
import { TaskItem } from './TaskItem/TaskItem';
import { Accordion } from '../Accordion/Accordion';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useTasks } from '../../hooks/useTasks';
import { SideMenu } from '../../enums';

const ComplitedTasksComponent: FC = () => {
	const { completedTaskslist, setComplitedTasksList, onChangeTaskStatus, changeTaskImportanceMutation } = useTasks();

	const { onDragStart, onDragOver, onDragLeave, onDrop } = useDragAndDrop(completedTaskslist, setComplitedTasksList);

	return (
		<>
			{!!completedTaskslist?.length && (
				<Accordion title={'Wykonane'} details={<span className='ml-1 text-base text-darkerGrey'>{completedTaskslist?.length}</span>}>
					{completedTaskslist?.map((task, index) => (
						<TaskItem
							key={task._id}
							task={task}
							onChangeTaskStatus={onChangeTaskStatus}
							isCompleted
							index={index}
							redirectTo={`/${SideMenu.tasks}/`}
							onDragStart={onDragStart}
							onDragOver={onDragOver}
							onDrop={onDrop}
							onDragLeave={onDragLeave}
							changeTaskImportance={changeTaskImportanceMutation}
						/>
					))}
				</Accordion>
			)}
		</>
	);
};

export const ComplitedTasks = memo(ComplitedTasksComponent);
