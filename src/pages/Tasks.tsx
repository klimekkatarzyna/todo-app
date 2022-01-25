import { FC } from 'react';
import { Board } from '../components/Board';
import { useList } from '../components/List/useList';
import { Loader } from '../components/Loader/Loader';
import { CreateTask } from '../components/Tasks/CreateTask';
import { TasksList } from '../components/Tasks/Tasks';
import { Toolbar } from '../components/Toolbar';

export const Tasks: FC = () => {
	const { listDataResponse, listDataLoading } = useList();

	return (
		<Board>
			<div>
				{listDataLoading ? <Loader /> : <Toolbar name={listDataResponse?.title || ''} colorType={listDataResponse?.themeColor} />}

				<div>
					<CreateTask />
					<TasksList />
				</div>
			</div>
		</Board>
	);
};
