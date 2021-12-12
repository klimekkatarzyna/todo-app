import React, { FC } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import styled from 'styled-components';
import { Folder } from '@styled-icons/feather/Folder';
import { IGroup } from '../../interfaces/group';
import { COLOURS, contextualMenuGroupOpion, IconWrapper } from '../../constants';
import { GroupedLists } from './GroupedLists';
import { useDropdown } from '../../hooks/useDropdown';
import { ContextualMenu } from '../ContextualMenu/ContextualMenu';

const Wrapper = styled.div<{ isNavClosed: boolean }>`
	display: flex;
	padding: 0.5rem 1rem;
	cursor: pointer;
	&:hover {
		background-color: ${COLOURS.white};
	}
	> p {
		margin: 0 0.5rem;
		font-weight: 600;
		font-size: 0.9rem;
		display: ${props => (props.isNavClosed ? 'none' : 'flex')};
	}
`;

interface IGroupProps {
	group: IGroup;
	isNavClosed: boolean;
}

export const Group: FC<IGroupProps> = ({ group, isNavClosed }) => {
	const { elementeReference, toggleDropdown, dropdownOpen } = useDropdown();

	return (
		<div ref={elementeReference}>
			<ContextMenuTrigger id={group._id}>
				<Wrapper onClick={toggleDropdown} isNavClosed={isNavClosed}>
					<IconWrapper color='grey'>
						<Folder />
					</IconWrapper>
					<p>{group.title}</p>
				</Wrapper>
			</ContextMenuTrigger>
			{dropdownOpen && <GroupedLists />}
			<ContextualMenu contextualMenuList={contextualMenuGroupOpion} listElementId={group?._id || ''} />
		</div>
	);
};
