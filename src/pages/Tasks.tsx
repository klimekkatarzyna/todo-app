import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Board } from '../components/Board';
import useList from '../components/List/useList';
import Toolbar from '../components/Toolbar';
import { Body } from '../constants';

interface IUseParams {
    listId: string;
}

const Tasks = () => {
    const { listId } = useParams<IUseParams>();
    const { getListById } = useList(listId);
    const { data, isLoading } = useQuery(['getListById', listId], getListById);

    return (
        <Board>
            {isLoading ? (
                <span>{'loading...'}</span>
            ) : (
                <Toolbar name={data?.title || ''} colorType={data?.themeColor} />
            )}
            
            <Body>
            </Body>
        </Board>
    );
};

export default Tasks;