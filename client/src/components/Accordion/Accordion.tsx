import React, { FC, useCallback, memo, useState } from 'react';
import { IconWrapper } from '../../constants';
import { ArrowRight, ArrowDown } from 'react-feather';

interface IAccordion {
	title: string;
	children: React.ReactNode;
	details: React.ReactElement;
}

const AccordionComponent: FC<IAccordion> = ({ title, details, children }) => {
	const [isActive, setIsActive] = useState<boolean>(false);

	const onToogle = useCallback((): void => {
		setIsActive(!isActive);
	}, [isActive]);

	return (
		<div>
			<button onClick={onToogle} className='flex items-center border-none cursor-pointer bg-inherit p-3'>
				<IconWrapper color='grey'>{isActive ? <ArrowDown /> : <ArrowRight />}</IconWrapper>
				<h3 className='ml-1 m-0 text-base font-semibold'>{title}</h3>
				{details}
			</button>
			{isActive && <div>{children}</div>}
		</div>
	);
};

export const Accordion = memo(AccordionComponent);
