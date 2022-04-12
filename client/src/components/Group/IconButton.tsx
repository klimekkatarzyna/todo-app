import React, { FC } from 'react';
import { FolderPlus } from 'react-feather';
import { IconWrapper } from '../../constants';

interface IIconButton {
	onClick: () => void;
}

export const IconButton: FC<IIconButton> = ({ onClick }) => {
	// TODO: logic to adding group
	return (
		<div onClick={onClick} className='flex flex-col bg-light-grey p-2 cursor-pointer border-none hover:bg-white'>
			<IconWrapper color={'blue'}>
				<FolderPlus strokeWidth={1} />
			</IconWrapper>
		</div>
	);
};
