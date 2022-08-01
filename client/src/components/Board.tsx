import React, { FC, Suspense } from 'react';
import { TaskSidebarDetails } from './Tasks/TaskSidebarDetailsContainer';
import { Loader } from 'react-feather';
import { useRecoilValue } from 'recoil';
import { elementVisibilityState } from '../atoms/elementVisibility';

export const Board: FC<{ children: React.ReactNode }> = ({ children }) => {
	const isElementVisible = useRecoilValue(elementVisibilityState);

	return (
		<div className='flex flex-row flex-1 relative bg-light-grey pl-4 pr-4 md:pl-6 md:pr-6'>
			<div className='flex flex-col flex-1 relative h-full md:min-w-[400px]'>{children}</div>
			<Suspense fallback={<Loader className='animate-spin m-auto' />}>{isElementVisible && <TaskSidebarDetails />}</Suspense>
		</div>
	);
};
