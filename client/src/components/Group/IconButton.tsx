import React, { FC } from 'react';
import { FolderPlus } from 'react-feather';

export const IconButton: FC<{ onClick: () => void }> = ({ onClick }) => {
	return (
		<button onClick={onClick} className='flex flex-col bg-light-grey p-2 cursor-pointer border-none hover:bg-white'>
			<div>
				<FolderPlus strokeWidth={1} className='icon-style text-blue' />
			</div>
		</button>
	);
};
