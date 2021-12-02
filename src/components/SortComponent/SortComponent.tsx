import React, { useCallback, useEffect, useRef, useState, FC } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../../constants';

const Wrapper = styled.div`
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

enum SortType {
	date = 'date',
	name = 'name',
	importance = 'importance',
	deadline = 'deadline',
}

interface ISortComponent<T = any> {
	dataToSort: T;
}

// interface ISortComponent {
//     dataToSort: any;
// }

const SortComponent: FC<ISortComponent> = ({ dataToSort }) => {
	const sortReference = useRef<HTMLDivElement>(null);
	const [sortType, setSortType] = useState<SortType>(SortType.name);
	const [data, setData] = useState([]);

	const onSort = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortType(event.target.value as SortType);
	}, []);

	useEffect(() => {
		const sortArray = (type: SortType) => {
			const sorted =
				dataToSort?.length &&
				[...dataToSort]?.sort((a, b) => b.title[SortType[type]] - a.title[SortType[type]]);
			setData(sorted)
		};

		sortArray(sortType);
	}, [sortType, dataToSort, data]);

	console.log(data, dataToSort);

	return (
		<Wrapper>
			<div ref={sortReference}>
				<span>Sortuj według</span>
				<Select onChange={onSort}>
					<option value={SortType.name}>Alfabetycznie</option>
					<option value={SortType.date}>Data utworzenia</option>
					<option value={SortType.importance}>Ważność</option>
					<option value={SortType.deadline}>Termin wykonania</option>
				</Select>
			</div>
		</Wrapper>
	);
};

export default SortComponent;
