import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC } from 'react';

export const AutoAnimateWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [parent] = useAutoAnimate();
	type parentType = React.LegacyRef<HTMLDivElement> | undefined;

	return (
		<div
			ref={parent as parentType}
			className='tasks-list flex flex-col overflow-hidden overflow-y-scroll flex-1 pb-4 max-h-[80vh] md:max-h-[90vh]'>
			{children}
		</div>
	);
};
