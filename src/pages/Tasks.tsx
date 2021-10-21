import { Board } from '../components/Board';
import useList from '../components/List/useList';
import CreateTask from '../components/Tasks/Tasks';
import Toolbar from '../components/Toolbar';
import { Body } from '../constants';

const Tasks = () => {
    const { getListByIdData, getListByIdLoading } = useList();

    return (
        <Board>
            {getListByIdLoading ? (
                <span>{'loading...'}</span>
            ) : (
                <Toolbar name={getListByIdData?.title || ''} colorType={getListByIdData?.themeColor} />
            )}
            
            <Body>
                <CreateTask />
                {/* TODO: list of created tasks and realized tasks */}
            </Body>
        </Board>
    );
};

export default Tasks;