import React, { FC, useState } from 'react';
import styled, { css } from 'styled-components';
import { COLOURS } from '../../constants';

const TooltipWrapper = styled.div`
	position: relative;
`;

const TooltipBody = styled.div<{ position: TooltipPosition; show: boolean }>`
	background-color: ${COLOURS.white};
	padding: 0.7rem;
	border-radius: 0.3rem;
	width: fit-content;
	display: none;
	position: absolute;
	font-size: 0.8rem;
	top: -52px;
	box-shadow: rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px;
	z-index: 2;
	left: ${props => (props.position === 'left' ? '-10px' : 'auto')};
	right: ${props => (props.position === 'right' ? '-10px' : 'auto')};

	${props =>
		props.show &&
		css`
			display: flex;
		`};

	&:after {
		content: '';
		position: absolute;
		top: 36px;
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 10px solid ${COLOURS.white};
		left: ${props => (props.position === 'left' ? '15px' : 'auto')};
		right: ${props => (props.position === 'right' ? '15px' : 'auto')};
	}
`;

const Text = styled.span`
	white-space: nowrap;
`;

type TooltipPosition = 'left' | 'right';

interface ITooltip {
	children: React.ReactNode;
	position: TooltipPosition;
	text?: string;
}

const Tooltip: FC<ITooltip> = ({ children, position, text }) => {
	const [show, setShow] = useState<boolean>(false);

	return (
		<TooltipWrapper>
			<TooltipBody position={position} show={show}>
				<Text>{text}</Text>
			</TooltipBody>
			<div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
				{children}
			</div>
		</TooltipWrapper>
	);
};

export default Tooltip;
