import { AppColor } from '@kkrawczyk/todo-common';
import { FC } from 'react';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { useTranslation } from 'react-i18next';

export const Inbox: FC = () => {
	const { t } = useTranslation();
	return (
		<Board>
			<Toolbar name={t('tasks-title')} colorType={AppColor.red} />
		</Board>
	);
};
