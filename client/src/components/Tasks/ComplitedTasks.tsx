import { FC, memo } from 'react';
import { Accordion } from '../../common/Accordion/Accordion';
import { SideMenu } from '../../enums';
import { TasksList } from './TasksList';
import { ITask } from '@kkrawczyk/todo-common';
import { useTranslation } from 'react-i18next';

const ComplitedTasksComponent: FC<{ tasks: ITask[] }> = ({ tasks }) => {
	const { t } = useTranslation();
	return (
		<>
			{!!tasks?.length && (
				<Accordion title={t('completed')} details={<span className='ml-1 text-base text-darkerGrey completed'>{tasks?.length}</span>}>
					<TasksList tasks={tasks} redirectUrl={`/${SideMenu.tasks}/`} />
				</Accordion>
			)}
		</>
	);
};

export const ComplitedTasks = memo(ComplitedTasksComponent);
