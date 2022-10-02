import { AppColor } from '@kkrawczyk/todo-common';
import { FC } from 'react';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';
import { useTranslation } from 'react-i18next';

export const Planned: FC = () => {
	const { t } = useTranslation();
	return (
		<Board>
			<Toolbar name={t('planned-title')} colorType={AppColor.blue} />
		</Board>
	);
};
