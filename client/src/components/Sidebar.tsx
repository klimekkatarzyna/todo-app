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
		<aside
			className={`flex bg-light-grey flex-col pt-4 pb-14 px-0 ${
				isNavClosed ? 'w-14' : 'w-80 md:w-72'
			} transition-width duration-200 ease-in absolute z-10 left-0 bottom-0 top-[45px] h-auto md:relative md:h-[94vh] md:top-0`}>
			{/*TODO: search*/}
			<button className='border-none bg-inherit text-center p-2 ml-2' onClick={handleClick}>
				{<Menu className='stroke-blue icon-style' />}
			</button>
			<div className='overflow-y-scroll w-full mt-6 h-full'>
				<MainList isNavClosed={isNavClosed} />

				<div className='h-[50%]'>
					<Lists isNavClosed={isNavClosed} />
					<Groups isNavClosed={isNavClosed} />
				</div>
			</div>
			<div className='flex absolute left-0 right-0 bottom-0 border-solid border-2 w-full items-center'>
				<CreateList />
				<CreateGroup />
			</div>
		</aside>
	);
};
