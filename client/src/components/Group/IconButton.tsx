import React, { FC } from 'react';
import { FolderPlus } from 'react-feather';

interface IIconButton {
	onClick: () => void;
}

export const IconButton: FC<IIconButton> = ({ onClick }) => {
	return (
		<div onClick={onClick} className='flex flex-col bg-light-grey p-2 cursor-pointer border-none hover:bg-white'>
			<div>
				<FolderPlus strokeWidth={1} className='icon-style text-blue' />
			</div>
		</div>
	);
};
