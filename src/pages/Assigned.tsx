import { FC } from 'react';
import Toolbar from '../components/Toolbar';
import { Board } from '../components/Board';

const Assigned: FC = () => {
	return (
		<Board>
			<Toolbar name={'Przypisane do mnie'} colorType={'green'} />
		</Board>
	);
};

export default Assigned;
