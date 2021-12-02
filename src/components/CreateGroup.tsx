import React from 'react';
import styled from 'styled-components';
import { FolderPlus } from '@styled-icons/feather/FolderPlus';
import { COLOURS, IconWrapper } from '../constants';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: ${COLOURS.lightGrey};
	padding: 0.6rem;
	cursor: pointer;
	&:hover {
		background-color: ${COLOURS.white};
	}
`;

const CreateGroup = () => {
	// TODO: logic to adding group
	return (
		<Wrapper>
			<IconWrapper color={'blue'}>
				<FolderPlus />
			</IconWrapper>
		</Wrapper>
	);
};

export default CreateGroup;
