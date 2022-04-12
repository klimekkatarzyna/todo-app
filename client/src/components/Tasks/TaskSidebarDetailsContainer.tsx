import { FC, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from '../../constants';
import { getDay, getDayName, getMonth, parseUTCtoDate } from '../../utils/date';
import { TaskDetails } from './TaskDetails';
import { addTaskToMyDayAction } from '../../actions/tasks';
import { useTasks } from '../../hooks/useTasks';
import { ElementVisibilityContext } from '../../providers/ElementVisibilityProvider';
import { ITask, ITaskStatus } from '@kkrawczyk/todo-common';
import { Loader, Sun, Bell, Calendar, Repeat, UserPlus, FilePlus, Trash2, XSquare } from 'react-feather';

const TaskSidebarDetailsContainer = styled.div`
	background-color: ${COLOURS.lightGrey};
	width: 290px;
	padding: 1rem;
	position: relative;
`;

const TaskDetailsWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Container = styled.div<{ flexRow?: boolean; margin?: boolean }>`
	display: flex;
	flex-direction: ${props => (props.flexRow ? 'row' : 'column')};
	margin-bottom: ${props => props.margin && '0.7rem'};
	background-color: ${COLOURS.white};
	padding: 1rem;
	border: 1px solid ${COLOURS.border};
`;

const Section = styled.button`
	display: flex;
	color: ${COLOURS.darkerGrey};
	font-size: 0.9rem;
	svg {
		margin-right: 0.5rem;
	}
`;

const Footer = styled.div`
	display: flex;
	align-items: center;
	position: absolute;
	bottom: 1rem;
	color: ${COLOURS.darkerGrey};
	font-size: 0.8rem;
	button {
		border: none;
		background: inherit;
		cursor: pointer;
	}
`;

export const TaskSidebarDetails: FC = () => {
	const { onHide } = useContext(ElementVisibilityContext);
	const { onChangeTaskStatus, taskData, taskDataLoading, removeTaskMutation, listId, changeTaskImportanceMutation } = useTasks();

	const handleClick = useCallback(async (): Promise<void> => {
		try {
			await removeTaskMutation();
			onClose();
		} catch {
			//TODO: handle error & show notificayion
		}
	}, [taskData?._id]);

	const onClose = useCallback((): void => {
		onHide();
	}, []);

	const addTaskToMyDayView = useCallback(() => {
		addTaskToMyDayAction({ parentFolderId: listId, _id: taskData?._id, isMyDay: true });
	}, [taskData?._id]);

	return (
		<TaskSidebarDetailsContainer>
			{taskDataLoading ? (
				<Loader className='m-auto' />
			) : (
				<TaskDetailsWrapper>
					<Container flexRow margin>
						<TaskDetails
							taskData={taskData as ITask}
							isCompleted={taskData?.taskStatus === ITaskStatus.complete}
							onChangeTaskStatus={onChangeTaskStatus}
							changeTaskImportance={changeTaskImportanceMutation}
							isTaskDetailsView
						/>
					</Container>

					<Container margin>
						<Section onClick={addTaskToMyDayView}>
							<IconWrapper color='grey'>
								<Sun strokeWidth={1} />
							</IconWrapper>
						</Section>
					</Container>

					<Container>
						<Section>
							<IconWrapper color='grey'>
								<Bell strokeWidth={1} />
							</IconWrapper>
							{'Przypomnij'}
						</Section>
					</Container>
					<Container>
						<Section>
							<IconWrapper color='grey'>
								<Calendar strokeWidth={1} />
							</IconWrapper>
							{'Dodaj termin wykonania'}
						</Section>
					</Container>
					<Container margin>
						<Section>
							<IconWrapper color='grey'>
								<Repeat strokeWidth={1} />
							</IconWrapper>
							{'Powtórz'}
						</Section>
					</Container>

					<Container margin>
						<Section>
							<IconWrapper color='grey'>
								<UserPlus strokeWidth={1} />
							</IconWrapper>
							{'Przydziel do'}
						</Section>
					</Container>

					<Container margin>
						<Section>{'Wybierz kategorię'}</Section>
					</Container>

					<Container margin>
						<Section>
							<IconWrapper color='grey'>
								<FilePlus strokeWidth={1} />
							</IconWrapper>
							{'Dodaj plik'}
						</Section>
					</Container>

					<Container>
						<textarea />
					</Container>

					<Footer>
						<button onClick={onClose}>
							<IconWrapper color='grey'>
								<XSquare strokeWidth={1} />
							</IconWrapper>
						</button>
						{`Utworzone ${getDayName(parseUTCtoDate(taskData?.createdAt || ''))}, ${getDay(
							parseUTCtoDate(taskData?.createdAt || '')
						)} ${getMonth(parseUTCtoDate(taskData?.createdAt || ''))}`}
						<button onClick={handleClick}>
							<IconWrapper color='grey'>
								<Trash2 strokeWidth={1} />
							</IconWrapper>
						</button>
					</Footer>
				</TaskDetailsWrapper>
			)}
		</TaskSidebarDetailsContainer>
	);
};
