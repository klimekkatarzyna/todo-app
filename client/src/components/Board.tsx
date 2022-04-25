import React, { FC, useContext } from 'react';
import { ElementVisibilityContext } from '../providers/ElementVisibilityProvider';
import { TaskSidebarDetails } from './Tasks/TaskSidebarDetailsContainer';
interface IBoard {
	children: React.ReactNode;
}

// export const BackgroundLines = styled.div`

// 	background: linear-gradient(180deg, white, white 52px, #e5e5e5 52px, #e5e5e5 52px);
// `;

export const Board: FC<IBoard> = ({ children }) => {
	const { isVisible } = useContext(ElementVisibilityContext);

	return (
		<div className='flex flex-row flex-1'>
			<div className='flex flex-col flex-1 relative mt-4 mb-0 ml-2 mr-2'>
				{children}
				<div className='m-0 flex-1 h-full shadow-sm bg-[length:100%_53px] bg-gradient-to-b from-white-400 to-blue-500;' />
			</div>
			{isVisible && <TaskSidebarDetails />}
		</div>
	);
};
