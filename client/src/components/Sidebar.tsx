import { FC, useCallback, useState } from 'react';
import { CreateList } from './List/CreateList/CreateList';
import { Lists } from './List/Lists/Lists';
import { MainList } from './MainList/MainList';
import { CreateGroup } from './Group/CreateGroup';
import { Groups } from './Group/Groups';
import { Menu } from 'react-feather';
import { useRecoilValue } from 'recoil';
import { mobileNavVisibilityState } from '../atoms';

export const Sidebar: FC = () => {
	const [isNavClosed, setIsNavClosed] = useState<boolean>(false);
	const isMobileNavVisible = useRecoilValue(mobileNavVisibilityState);

	const handleClick = useCallback(() => {
		setIsNavClosed(!isNavClosed);
	}, [isNavClosed, setIsNavClosed]);

	return (
		<aside
			className={`flex bg-white flex-col pt-4 pb-14 px-0 ${isMobileNavVisible ? 'block' : 'hidden md:block'} ${
				isNavClosed ? 'w-14' : 'w-full md:w-72'
			} transition-width duration-200 ease-in absolute z-10 left-0 bottom-0 top-0 h-auto md:relative md:h-[94vh]`}>
			<button className='border-none bg-inherit text-center p-2 ml-2 hidden md:block' onClick={handleClick}>
				{<Menu className='stroke-blue flex flex-row flex-1 relative icon-style' />}
			</button>

			<div className='overflow-y-scroll w-full mt-0 h-full md:mt-6'>
				<MainList isNavClosed={isNavClosed} />

				<div className='h-[50%]'>
					<Lists isNavClosed={isNavClosed} />
					<Groups isNavClosed={isNavClosed} />
				</div>
			</div>
			<div className={`flex absolute left-0 right-0 bottom-0 border-solid border-2 w-full items-center ${isNavClosed ? 'hidden' : 'flex'}`}>
				<CreateList />
				<CreateGroup />
			</div>
		</aside>
	);
};
