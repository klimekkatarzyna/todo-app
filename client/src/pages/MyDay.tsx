import { FC, useMemo } from 'react';
import { useQuery } from 'react-query';
import { onGetMayDayTasksAction } from '../api/tasks';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { ROUTE, QueryKey } from '../enums';
import { Loader } from 'react-feather';
import { AppColor, ITask } from '@kkrawczyk/todo-common';
import { buildUrl } from '../utils/paths';
import { TasksList } from '../components/Tasks/TasksList';
import { useTranslation } from 'react-i18next';

export const MyDay: FC = () => {
	const { t } = useTranslation();
	const { data, isLoading } = useQuery<ITask[] | undefined>([QueryKey.getMyDayTasks], onGetMayDayTasksAction);
	const filteredTasks = useMemo(() => data?.filter(task => task.isMyDay === true), [data]);

	return (
		<Board>
			<Toolbar name={t('my-day')} colorType={AppColor.grey} isDateVisible />
			{isLoading ? <Loader className='animate-spin m-auto' /> : <TasksList tasks={filteredTasks} redirectUrl={`${buildUrl(ROUTE.myDay)}/`} />}
		</Board>
	);
};
