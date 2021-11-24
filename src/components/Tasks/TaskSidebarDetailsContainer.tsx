import React, { FC, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { COLOURS, IconWrapper } from '../../constants';
import { ITask, ITaskStatus } from '../../interfaces/task';
import { getDay, getDayName, getMonth, parseUTCtoDate } from '../../utils/date';
import Loader from '../Loader/Loader';
import TaskDetails from './TaskDetails';
import useTask from './useTask';
import { Sun } from '@styled-icons/feather/Sun';
import { Bell } from '@styled-icons/feather/Bell';
import { Calendar } from '@styled-icons/feather/Calendar';
import { Repeat } from '@styled-icons/feather/Repeat';
import { UserPlus } from '@styled-icons/feather/UserPlus';
import { FilePlus } from '@styled-icons/feather/FilePlus';
import { Trash2 } from '@styled-icons/feather/Trash2';
import { XSquare } from '@styled-icons/feather/XSquare';
import { ShowElementContext } from '../../ShowElementContext';

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

const Container = styled.div<{ flexRow?: boolean, margin?: boolean }>`
    display: flex;
    flex-direction: ${props => props.flexRow ? 'row' : 'column'};
    margin-bottom: ${props => props.margin && '0.7rem'};
    background-color: ${COLOURS.white};
    padding: 1rem;
    border: 1px solid ${COLOURS.border};
    &:hover {
        background-color: ${COLOURS.lightGrey};
    }
`;

const Section = styled.div`
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

const TaskSidebarDetails: FC = () => {
    const { onHideComponent } = useContext(ShowElementContext);
    const { taskDataLoading, taskData, onMarkTaskAsCompleted, onMarkTaskAsInCompleted, mutateRemoveTask } = useTask();

    const onHandleChange = useCallback(() => {
        taskData?.taskStatus === ITaskStatus.inComplete && onMarkTaskAsCompleted(taskData._id);
        taskData?.taskStatus === ITaskStatus.complete && onMarkTaskAsInCompleted(taskData._id);
    }, [taskData]);

    const handleClick = useCallback(async (): Promise<void> => {
        try {
            await mutateRemoveTask(taskData?._id || '');
            onClose();
        } catch {
            //TODO: handle error & show notificayion
        }
    }, []);

    const onClose = useCallback((): void => {
        onHideComponent();
    }, []);

    return (
        <TaskSidebarDetailsContainer>
            {taskDataLoading ? (
                <Loader />
            ) : (
                <TaskDetailsWrapper>
                    <Container flexRow margin>
                        <TaskDetails taskData={taskData as ITask} onHandleChange={onHandleChange} isChecked={false} onClickImportanceButton={() => {}} />
                    </Container>

                    <Container margin>
                        <Section>
                            <IconWrapper color='grey'><Sun /></IconWrapper>
                            {'Dodaj do widoku "Mój dzień'}
                        </Section>
                    </Container>
                    
                    <Container>
                        <Section>
                            <IconWrapper color='grey'><Bell /></IconWrapper>
                            {'Przypomnij'}
                        </Section>
                    </Container>
                    <Container>
                        <Section>
                            <IconWrapper color='grey'><Calendar /></IconWrapper>
                            {'Dodaj termin wykonania'}
                        </Section>
                    </Container>
                    <Container margin>
                        <Section>
                            <IconWrapper color='grey'><Repeat /></IconWrapper>
                            {'Powtórz'}
                        </Section>
                    </Container>

                    <Container margin>
                        <Section>
                            <IconWrapper color='grey'><UserPlus /></IconWrapper>
                            {'Przydziel do'}
                        </Section>
                    </Container>

                    <Container margin>
                        <Section>{'Wybierz kategorię'}</Section>  
                    </Container>

                    <Container margin>
                        <Section>
                            <IconWrapper color='grey'><FilePlus /></IconWrapper>
                            {'Dodaj plik'}
                        </Section>
                    </Container>

                    <Container>
                        <textarea />
                    </Container>

                    <Footer>
                        <button onClick={onClose}>
                            <IconWrapper color='grey'><XSquare /></IconWrapper>
                        </button>
                        {`Utworzone ${getDayName(parseUTCtoDate(taskData?.createdAt || ''))}, ${getDay(parseUTCtoDate(taskData?.createdAt || ''))} ${getMonth(parseUTCtoDate(taskData?.createdAt || ''))}`}
                        <button onClick={handleClick}>
                            <IconWrapper color='grey'><Trash2 /></IconWrapper>
                        </button>
                    </Footer>
                </TaskDetailsWrapper>
            )}
        </TaskSidebarDetailsContainer>
    );
};

export default TaskSidebarDetails;