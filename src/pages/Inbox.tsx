import { FC } from 'react';
import { Board } from '../components/Board';
import Toolbar from '../components/Toolbar';

const Inbox: FC = () => {
	return (
		<Board>
			<Toolbar name={'Zadania'} colorType={'red'} />
		</Board>
	);
};

export default Inbox;
