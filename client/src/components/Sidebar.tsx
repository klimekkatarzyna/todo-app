import { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { COLOURS } from '../constants';
import { CreateList } from './List/CreateList/CreateList';
import { Lists } from './List/Lists/Lists';
import { MainList } from './MainList/MainList';
import { CreateGroup } from './Group/CreateGroup';
import { Groups } from './Group/Groups';
import { Menu } from '@styled-icons/feather/Menu';

const Wrapper = styled.div<{ isNavClosed: boolean }>`
	display: flex;
	background-color: ${COLOURS.lightGrey};
	border-right: 1px solid #f4f4f4;
	flex-direction: column;
	height: 100%;
	padding: 1rem 0;
	width: ${props => (props.isNavClosed ? '55px' : '250px')};
	transition: width 180ms ease;
	height: 618px;
	transition: width 0.5s;
`;

const MenuButton = styled.button`
	border: none;
	background-color: inherit;
	text-align: left;
	padding: 0.6rem;
	cursor: pointer;
	svg {
		width: 30px;
		stroke: ${COLOURS.blue};
	}
`;

const ScrolledWrapper = styled.div`
	overflow-y: scroll;
`;

const InputsWrapper = styled.div`
	display: flex;
	position: fixed;
	bottom: 0;
	border-top: 1px solid ${COLOURS.darkerGrey};
`;

export const Sidebar: FC = () => {
	const [isNavClosed, setIsNavClosed] = useState(false);

	const handleClick = useCallback(() => {
		setIsNavClosed(!isNavClosed);
	}, [isNavClosed]);

	return (
		<Wrapper isNavClosed={isNavClosed}>
			{/*TODO: search*/}
			<MenuButton onClick={handleClick}>{<Menu />}</MenuButton>
			<ScrolledWrapper>
				<MainList isNavClosed={isNavClosed} />

				<Lists isNavClosed={isNavClosed} />
				<Groups isNavClosed={isNavClosed} />
			</ScrolledWrapper>
			<InputsWrapper>
				<CreateList />
				<CreateGroup />
			</InputsWrapper>
		</Wrapper>
	);
};
