import React, { FC, useContext } from 'react';
import { BackgroundLines } from '../constants';
import { ElementVisibilityContext } from '../providers/ElementVisibilityProvider';
import { TaskSidebarDetails } from './Tasks/TaskSidebarDetailsContainer';
interface IBoard {
	children: React.ReactNode;
}

export const Board: FC<IBoard> = ({ children }) => {
	const { isVisible } = useContext(ElementVisibilityContext);

	return (
		<div className='flex flex-row flex-1'>
			<div className='flex flex-col flex-1 relative mt-0 mb-0 ml-2 mr-2'>
				{children}
				<BackgroundLines />
			</div>
			{isVisible && <TaskSidebarDetails />}
		</div>
	);
};
