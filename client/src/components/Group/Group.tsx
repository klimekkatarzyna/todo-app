import React, { FC } from 'react';
import { ContextMenuTrigger } from 'react-contextmenu';
import styled from 'styled-components';
import { Folder } from 'react-feather';
import { IGroup } from '@kkrawczyk/todo-common';
import { COLOURS, contextualMenuGroupOpion, IconWrapper } from '../../constants';
import { GroupedLists } from './GroupedLists';
import { useDropdown } from '../../hooks/useDropdown';
import { ContextualMenu } from '../ContextualMenu/ContextualMenu';
import { EditGroup } from './EditGroup';

const Wrapper = styled.div<{ isNavClosed: boolean }>`
	display: flex;
	padding: 0.5rem 1rem;
	cursor: pointer;
	align-items: center;
	&:hover {
		background-color: ${COLOURS.white};
	}
	> div > p {
		margin: 0 0.5rem;
		font-weight: 600;
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
			<ContextMenuTrigger id={group._id as string}>
				<Wrapper onClick={toggleDropdown} isNavClosed={isNavClosed}>
					<IconWrapper color='grey'>
						<Folder strokeWidth={1} />
					</IconWrapper>
					<EditGroup title={group.title} groupId={group._id} />
				</Wrapper>
			</ContextMenuTrigger>
			{dropdownOpen && <GroupedLists />}
			<ContextualMenu contextualMenuList={contextualMenuGroupOpion} elementId={group?._id} />
		</div>
	);
};
