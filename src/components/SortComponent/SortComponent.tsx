import React, { useRef, FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';
import { SortTaskType } from '../../enums';

const SortingOptionsButton = styled.button`
	position: absolute;
	right: 1rem;
	top: 0;
	background-color: inherit;
	border: none;
	color: ${COLOURS.blue};
	cursor: pointer;
	padding: 1rem;
	&:hover {
		background-color: ${COLOURS.lightGrey};
	}
`;

const Wrapper = styled.div`
	position: absolute;
	right: 1rem;
	top: 3rem;
	z-index: 1;
	background-color: ${COLOURS.white};
	width: 300px;
	height: 200px;
	box-shadow: rgb(0 0 0 / 13%) 0px 3.2px 7.2px 0px, rgb(0 0 0 / 11%) 0px 0.6px 1.8px 0px;
	> div {
		display: flex;
		flex-direction: column;
		align-items: center;

		span {
			padding: 1rem;
			border-bottom: 1px solid ${COLOURS.border};
			width: 100%;
			text-align: center;
		}
	}
`;

const Select = styled.select`
	border: none;
	outline: none;
	font-size: 1rem;
	padding: 1rem;
`;
interface ISortComponent {
	requestSort: (event: any) => void;
}

export const SortComponent: FC<ISortComponent> = ({ requestSort }) => {
	const sortReference = useRef<HTMLDivElement>(null);

	return (
		<>
			<SortingOptionsButton>Sortuj</SortingOptionsButton>
			<Wrapper>
				<div ref={sortReference}>
					<span>Sortuj według</span>
					<Select onChange={requestSort}>
						<option value={[SortTaskType.title, 'string']}>Alfabetycznie</option>
						<option value={[SortTaskType.createdAt, 'date']}>Data utworzenia</option>
						<option value={[SortTaskType.importance, 'string']}>Ważność</option>
						<option value={[SortTaskType.deadline, 'date']}>Termin wykonania</option> TODO: add to task schema
					</Select>
				</div>
			</Wrapper>
		</>
	);
};
