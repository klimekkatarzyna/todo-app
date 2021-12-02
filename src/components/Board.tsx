import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { BackgroundLines } from '../constants';
import { ShowElementContext } from '../ShowElementContext';
import TaskSidebarDetails from './Tasks/TaskSidebarDetailsContainer';

const Wrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: row;
`;

const MainContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	margin: 1rem;
`;
interface IBoard {
	children: React.ReactNode;
}

export const Board: FC<IBoard> = ({ children }) => {
	const { isVisible } = useContext(ShowElementContext);

	return (
		<Wrapper>
			<MainContainer>
				{children}
				<BackgroundLines />
			</MainContainer>
			{isVisible && <TaskSidebarDetails />}
		</Wrapper>
	);
};
