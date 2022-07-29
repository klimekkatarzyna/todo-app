import { useAutoAnimate } from '@formkit/auto-animate/react';
import { FC } from 'react';

export const AutoAnimateWrapper: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [parent] = useAutoAnimate();
	type parentType = React.LegacyRef<HTMLDivElement> | undefined;

	return <div ref={parent as parentType}>{children}</div>;
};
