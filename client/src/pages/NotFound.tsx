import { FC } from 'react';

export const NotFound: FC = () => {
	return (
		<div className='flex items-center flex-col flex-1 m-2'>
			<h1 className='text-[5rem]'>404</h1>
			<p>You took a wrong turn, mate...</p>
		</div>
	);
};
