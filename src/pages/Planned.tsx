import { FC } from 'react';
import { Board } from '../components/Board';
import Toolbar from '../components/Toolbar';

const Planned: FC = () => {
	return (
		<Board>
			<Toolbar name={'Zaplanowane'} colorType={'blue'} />
		</Board>
	);
};

export default Planned;
