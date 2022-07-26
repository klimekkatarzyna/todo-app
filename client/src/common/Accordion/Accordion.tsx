import React, { FC, useCallback, memo, useState } from 'react';
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
			<button onClick={onToogle} className='accordion flex items-center text-sm border-none cursor-pointer bg-inherit p-3'>
				<div>{isActive ? <ArrowDown className='icon-style text-grey' /> : <ArrowRight className='icon-style text-grey' />}</div>
				<h3 className='ml-1 m-0 font-semibold text-sm'>{title}</h3>
				{details}
			</button>
			{isActive && <div>{children}</div>}
		</div>
	);
};

export const Accordion = memo(AccordionComponent);
