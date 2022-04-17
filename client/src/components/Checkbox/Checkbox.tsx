import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import { COLOURS } from '../../constants';
import { AppColorType } from '../../enums';
import { Tooltip } from '../Tooltip/Tooltip';

interface CheckboxWrapperProps {
	round?: boolean;
	color?: AppColorType | undefined;
	disabled?: boolean;
}

const CheckboxWrapper = styled.div<CheckboxWrapperProps>`
	input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
		&:checked ~ span {
			${props =>
				props.color === 'blue' &&
				css`
					background-color: ${COLOURS.blue};
				`}
			${props =>
				props.color === 'red' &&
				css`
					background-color: ${COLOURS.red};
				`}
            ${props =>
				props.color === 'grey' &&
				css`
					background-color: ${COLOURS.grey};
				`}
		}
		&:checked ~ span:after {
			display: block;
		}
	}

	span {
		position: relative;
		top: 0;
		left: 0;
		height: 1.3rem;
		width: 1.3rem;
		border-radius: 0.3rem;
		flex-shrink: 0;

		${props =>
			props.color === 'blue' &&
			css`
				border: 1px solid ${COLOURS.blue};
			`}

		${props =>
			props.color === 'red' &&
			css`
				border: 1px solid ${COLOURS.red};
			`}

        ${props =>
			props.color === 'grey' &&
			css`
				border: 1px solid ${COLOURS.grey};
			`}

        ${props =>
			props.round &&
			css`
				border-radius: 50%;
				height: 15px;
				width: 15px;
			`}

        &:after {
			content: '';
			position: absolute;
			display: none;
			left: 6px;
			top: 2px;
			width: 2px;
			height: 7px;
			border: solid ${COLOURS.white};
			border-width: 0 2px 2px 0;
			transform: rotate(45deg);
		}
	}
`;

interface CheckboxProps {
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	checked?: boolean;
	id?: string;
	key?: string;
	round?: boolean;
	color?: AppColorType;
	disabled?: boolean;
	tooltipText?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ round, color, disabled, checked, onChange, id, key, children, tooltipText }) => {
	return (
		<Tooltip position={'left'} text={tooltipText}>
			<CheckboxWrapper round={round} color={color || 'blue'} disabled={disabled} className={`relative flex ${disabled && 'opacity-50'}`}>
				<label className='relative cursor-pointer flex items-center leading-5'>
					<input type='checkbox' checked={!!checked} onChange={onChange} id={id} key={key} disabled={disabled} />
					<span />
					{children && <div className='text-sm ml-2'>{children}</div>}
				</label>
			</CheckboxWrapper>
		</Tooltip>
	);
};
