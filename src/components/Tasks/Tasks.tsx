import { FC } from 'react';
import styled from 'styled-components';
import Loader from '../Loader/Loader';
import ComplitedTasks from './ComplitedTasks';
import InCompletedTasks from './InCompletedTasks';
import useTask from './useTask';

const TasksListContainer = styled.div`
    box-shadow: inset 0 1px 0 0 #e5e5e5;
    height: 550px;
    overflow-y: scroll;
`;

const TasksList: FC = () => {
    const { getTasksOfCurrentListLoading } = useTask();
    
    return (
        <TasksListContainer>
            {getTasksOfCurrentListLoading ? (
                <Loader />
            ) : (
                <>
                    <InCompletedTasks />
                    <ComplitedTasks />
                </>
            )}
        </TasksListContainer>
    );
};

export default TasksList;