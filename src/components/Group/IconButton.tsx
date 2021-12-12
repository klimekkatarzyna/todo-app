import React, { FC } from 'react';
import styled from 'styled-components';
import { FolderPlus } from '@styled-icons/feather/FolderPlus';
import { COLOURS, IconWrapper } from '../../constants';

const Wrapper = styled.button`
	display: flex;
	flex-direction: column;
	background-color: ${COLOURS.lightGrey};
	padding: 0.6rem;
	cursor: pointer;
	border: none;
	&:hover {
		background-color: ${COLOURS.white};
	}
`;

interface IIconButton {
	onClick: () => void;
}

export const IconButton: FC<IIconButton> = ({ onClick }) => {
	// TODO: logic to adding group
	return (
		<Wrapper onClick={onClick}>
			<IconWrapper color={'blue'}>
				<FolderPlus />
			</IconWrapper>
		</Wrapper>
	);
};
