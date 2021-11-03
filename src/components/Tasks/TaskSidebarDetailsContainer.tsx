import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { ITask } from '../../interfaces';
import Loader from '../Loader/Loader';
import TaskDetails from './TaskDetails';
import useTask from './useTask';

const TaskSidebarDetailsContainer = styled.div`
    background-color: ${COLOURS.lightGrey};
    width: 360px;
    padding: 1rem;
`;

const TaskDetailsWrapper = styled.div`
    display: flex;
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    background-color: ${COLOURS.white};
    padding: 1rem;
    border: 1px solid ${COLOURS.border};
`;

const TaskSidebarDetails: FC = () => {
    const [isSideberDetailsVisible, setIsSideberDetailsVisible] = useState<boolean>(false);

    const { taskDataLoading, taskData, onMarkTaskAsInCompleted } = useTask();

    const onHandleChange = useCallback(() => {
        onMarkTaskAsInCompleted(taskData?._id || '')
    }, [taskData]);

    return (
        <TaskSidebarDetailsContainer>
            {taskDataLoading ? (
                <Loader />
            ) : (
                <TaskDetailsWrapper>
                    <Container>
                        <TaskDetails taskData={taskData as ITask} onHandleChange={onHandleChange} />
                    </Container>

                </TaskDetailsWrapper>
            )}
        </TaskSidebarDetailsContainer>
    );
};

export default TaskSidebarDetails;