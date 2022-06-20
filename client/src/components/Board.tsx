import React, { FC, Suspense } from 'react';
import { TaskSidebarDetails } from './Tasks/TaskSidebarDetailsContainer';
import { Loader } from 'react-feather';
import { useRecoilValue } from 'recoil';
import { elementVisibilityState } from '../atoms/elementVisibility';

export const Board: FC<{ children: React.ReactNode }> = ({ children }) => {
	const isElementVisible = useRecoilValue(elementVisibilityState);

	return (
		<div className='flex flex-row flex-1'>
			<div className='flex flex-col flex-1 relative mt-4 mb-0 ml-16 h-full md:ml-2 '>
				{children}
				<div className='w-full h-full list-background' />
			</div>
			<Suspense fallback={<Loader className='m-auto' />}>{isElementVisible && <TaskSidebarDetails />}</Suspense>
		</div>
	);
};
