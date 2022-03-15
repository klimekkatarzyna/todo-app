import React, { useContext } from 'react';
import { MoreHorizontal } from '@styled-icons/feather/MoreHorizontal';

export const ListSettings = () => {
	return (
		<>
			<button className='flex text-sm bg-light-grey w-8 h-8'>
				<MoreHorizontal />
			</button>
		</>
	);
};
