import { FC } from 'react';
import { Board } from '../components/Board';
import { Toolbar } from '../components/Toolbar';

export const MyDay: FC = () => {
	return (
		<Board>
			<Toolbar name={'Mój dzień'} colorType={'grey'} isDateVisible />
		</Board>
	);
};
