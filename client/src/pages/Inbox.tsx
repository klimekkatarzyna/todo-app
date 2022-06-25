import { AppColor } from '@kkrawczyk/todo-common';
import { FC } from 'react';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';

export const Inbox: FC = () => {
	return (
		<Board>
			<Toolbar name={'Zadania'} colorType={AppColor.red} />
		</Board>
	);
};
