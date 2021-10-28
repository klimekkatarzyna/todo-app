import styled from 'styled-components';
import { Board } from '../components/Board';
import useList from '../components/List/useList';
import Loader from '../components/Loader/Loader';
import CreateTask from '../components/Tasks/CreateTask';
import TasksList from '../components/Tasks/Tasks';
import Toolbar from '../components/Toolbar';
import { Body } from '../constants';

const TasksPage = styled.div`
    flex: 1;
`;

const Tasks = () => {
    const { getListByIdData, getListByIdLoading } = useList();

    return (
        <Board>
            <TasksPage>
                {getListByIdLoading ? (
                    <Loader />
                ) : (
                    <Toolbar name={getListByIdData?.title || ''} colorType={getListByIdData?.themeColor} />
                )}
                
                <Body>
                    <CreateTask />
                    <TasksList />
                </Body>
            </TasksPage>
        </Board>
    );
};

export default Tasks;