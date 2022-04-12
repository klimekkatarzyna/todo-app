import { FC, useCallback, useState } from 'react';
import { CreateList } from './List/CreateList/CreateList';
import { Lists } from './List/Lists/Lists';
import { MainList } from './MainList/MainList';
import { CreateGroup } from './Group/CreateGroup';
import { Groups } from './Group/Groups';
import { Menu } from 'react-feather';

export const Sidebar: FC = () => {
	const [isNavClosed, setIsNavClosed] = useState(false);

	const handleClick = useCallback(() => {
		setIsNavClosed(!isNavClosed);
	}, [isNavClosed]);

	return (
		<div
			className={`flex bg-light-grey flex-col border-solid border-2 border-darkerGrey h-2/3 py-4 px-0 ${
				isNavClosed ? 'w-14' : 'w-64'
			} transition-width duration-200 ease-in`}>
			{/*TODO: search*/}
			<button className='border-none bg-inherit text-center p-2' onClick={handleClick}>
				{<Menu strokeWidth={1} className='stroke-blue w-8' />}
			</button>
			<div className='overflow-y-scroll'>
				<MainList isNavClosed={isNavClosed} />

				<Lists isNavClosed={isNavClosed} />
				<Groups isNavClosed={isNavClosed} />
			</div>
			<div className='flex fixed b-0 border-solid border-2 border-darkerGrey'>
				<CreateList />
				<CreateGroup />
			</div>
		</div>
	);
};
