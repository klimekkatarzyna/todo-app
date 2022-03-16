import React, { FC, useCallback, memo, useState } from 'react';
import styled from 'styled-components';
import { IconWrapper } from '../../constants';
import { ArrowRight } from '@styled-icons/feather/ArrowRight';
import { ArrowDown } from '@styled-icons/feather/ArrowDown';

const AccordionWrapper = styled.div`
	> button {
		border: none;
		background: inherit;
		padding: 0;
		padding: 1rem;
		display: flex;
		align-items: center;
		cursor: pointer;
	}

	h3 {
		font-weight: 600;
		font-size: 1rem;
		margin: 0;
		margin-left: 1rem;
	}
`;

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
		<AccordionWrapper>
			<button onClick={onToogle}>
				<IconWrapper color='grey'>{isActive ? <ArrowDown /> : <ArrowRight />}</IconWrapper>
				<h3>{title}</h3>
				{details}
			</button>
			{isActive && <div>{children}</div>}
		</AccordionWrapper>
	);
};

export const Accordion = memo(AccordionComponent);