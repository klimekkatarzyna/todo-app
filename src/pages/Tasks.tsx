import { FC } from 'react';
import { Board } from '../components/Board';
import useList from '../components/List/useList';
import Loader from '../components/Loader/Loader';
import SortComponent from '../components/SortComponent/SortComponent';
import CreateTask from '../components/Tasks/CreateTask';
import TasksList from '../components/Tasks/Tasks';
import useTask from '../components/Tasks/useTask';
import Toolbar from '../components/Toolbar';

const Tasks: FC = () => {
	const { getListByIdData, getListByIdLoading } = useList();
	const { getTasksOfCurrentListQuery } = useTask();

	return (
		<Board>
			<div>
				{getListByIdLoading ? (
					<Loader />
				) : (
					<Toolbar name={getListByIdData?.title || ''} colorType={getListByIdData?.themeColor} />
				)}
				<SortComponent dataToSort={getTasksOfCurrentListQuery?.body} />

				<div>
					<CreateTask />
					<TasksList />
				</div>
			</div>
		</Board>
	);
};

export default Tasks;
