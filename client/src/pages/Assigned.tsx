import { FC } from 'react';
import { Toolbar } from '../components/Toolbar';
import { Board } from '../components/Board';

export const Assigned: FC = () => {
	return (
		<Board>
			<Toolbar name={'Przypisane do mnie'} colorType={'green'} />
		</Board>
	);
};
