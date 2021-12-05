import { FC } from 'react';
import styled from 'styled-components';
import { ITask } from '../../interfaces/task';
import { TaskItem } from './TaskItem/TaskItem';
import { COLOURS } from '../../constants';
import { Accordion } from '../Accordion/Accordion';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useIncompleteCompleteTasks } from './useIncompleteCompleteTasks';

const TasksNumber = styled.span`
	margin-left: 1rem;
	font-size: 1rem;
	color: ${COLOURS.darkerGrey};
`;

export const ComplitedTasks: FC = () => {
	const { completedTaskslist, comletedTasks, setComplitedTasksList, onMarkTaskAsInCompleted, mutateChangeTaskImportance } =
		useIncompleteCompleteTasks();

	const { onDragStart, onDragOver, onDragLeave, onDrop } = useDragAndDrop(comletedTasks, setComplitedTasksList);

	return (
		<>
			{!!completedTaskslist?.length && (
				<Accordion title={'Wykonane'} details={<TasksNumber>{comletedTasks?.length}</TasksNumber>}>
					{completedTaskslist?.map((task, index) => (
						<TaskItem
							task={task}
							onChange={onMarkTaskAsInCompleted}
							isCompleted
							index={index}
							onDragStart={onDragStart}
							onDragOver={onDragOver}
							onDrop={onDrop}
							onDragLeave={onDragLeave}
							changeTaskImportance={mutateChangeTaskImportance}
						/>
					))}
				</Accordion>
			)}
		</>
	);
};
