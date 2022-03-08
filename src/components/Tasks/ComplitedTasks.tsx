import { FC } from 'react';
import styled from 'styled-components';
import { TaskItem } from './TaskItem/TaskItem';
import { COLOURS } from '../../constants';
import { Accordion } from '../Accordion/Accordion';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useTasks } from '../../hooks/useTasks';

const TasksNumber = styled.span`
	margin-left: 1rem;
	font-size: 1rem;
	color: ${COLOURS.darkerGrey};
`;

export const ComplitedTasks: FC = () => {
	const { completedTaskslist, setComplitedTasksList, onChangeTaskStatus, changeTaskImportanceMutation } = useTasks();

	const { onDragStart, onDragOver, onDragLeave, onDrop } = useDragAndDrop(completedTaskslist, setComplitedTasksList);

	return (
		<>
			{!!completedTaskslist?.length && (
				<Accordion title={'Wykonane'} details={<TasksNumber>{completedTaskslist?.length}</TasksNumber>}>
					{completedTaskslist?.map((task, index) => (
						<TaskItem
							key={task._id}
							task={task}
							onChangeTaskStatus={onChangeTaskStatus}
							isCompleted
							index={index}
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
