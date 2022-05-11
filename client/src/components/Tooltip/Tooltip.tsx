import React, { FC, useState } from 'react';

type TooltipPosition = 'left' | 'right';

interface ITooltip {
	children: React.ReactNode;
	position: TooltipPosition;
	text?: string;
}

export const Tooltip: FC<ITooltip> = ({ children, position, text }) => {
	const [show, setShow] = useState<boolean>(false);

	return (
		<div className='relative'>
			<div
				className={`bg-white p-3 absolute text-sm z-20 top-[-52px] w-fit shadow-md ${show ? 'flex' : 'hidden'} rounded-md ${
					position === 'left' ? 'left-[-10px]' : 'left-auto'
				} ${position === 'right' ? 'right-[-10px]' : 'right-auto'}`}>
				<span className='whitespace-nowrap'>{text}</span>
			</div>
			<div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
				{children}
			</div>
		</div>
	);
};
